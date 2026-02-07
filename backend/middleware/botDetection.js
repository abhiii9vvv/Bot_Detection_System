const RequestLog = require('../models/RequestLog');

// in-memory store for quick checks
const requestTracker = new Map();
const suspiciousIPs = new Map();

// yahan strict limit rakhi hai kyunki bots usually login endpoint ko abuse karte hain
const RATE_LIMITS = {
  login: { window: 60000, maxRequests: 5 }, // 5 requests per minute
  register: { window: 300000, maxRequests: 3 }, // 3 requests per 5 min
  default: { window: 60000, maxRequests: 30 }
};

const BOT_SCORE_THRESHOLDS = {
  LOG_ONLY: 20,
  RATE_LIMIT: 40,
  CAPTCHA_REQUIRED: 60,
  BLOCK: 80
};

// simple helper to get client IP
const getClientIP = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection.remoteAddress;
};

// calculate bot risk score
const calculateBotScore = (requestData) => {
  let score = 0;
  const { ip, endpoint, userAgent, timings, repeatCount, payloadHash } = requestData;

  // bahut fast requests (< 500ms between same type)
  if (timings?.timeBetweenRequests < 500) {
    score += 15;
  }

  // same payload baar baar
  if (repeatCount > 3) {
    score += 20;
  }

  // suspicious or missing user agent
  if (!userAgent || userAgent.length < 10 || userAgent.includes('bot')) {
    score += 25;
  }

  // no mouse/interaction data frontend se
  if (!timings?.mouseMovements && !timings?.scrolled) {
    score += 10;
  }

  // time to submit bahut kam (< 2 sec for forms)
  if (endpoint.includes('login') || endpoint.includes('register')) {
    if (timings?.timeToSubmit < 2000) {
      score += 20;
    }
  }

  // already suspicious IP
  if (suspiciousIPs.has(ip)) {
    const suspicionData = suspiciousIPs.get(ip);
    if (suspicionData.count > 5) {
      score += 15;
    }
  }

  return score;
};

// rate limiting check
const checkRateLimit = (ip, endpoint) => {
  const key = `${ip}:${endpoint}`;
  const now = Date.now();
  
  if (!requestTracker.has(key)) {
    requestTracker.set(key, []);
  }

  const requests = requestTracker.get(key);
  
  // find appropriate limit
  let limit = RATE_LIMITS.default;
  if (endpoint.includes('login')) limit = RATE_LIMITS.login;
  else if (endpoint.includes('register')) limit = RATE_LIMITS.register;

  // filter out old requests
  const recentRequests = requests.filter(timestamp => now - timestamp < limit.window);
  
  if (recentRequests.length >= limit.maxRequests) {
    return false;
  }

  recentRequests.push(now);
  requestTracker.set(key, recentRequests);
  
  return true;
};

// main middleware
const botDetectionMiddleware = async (req, res, next) => {
  const ip = getClientIP(req);
  const endpoint = req.originalUrl;
  const userAgent = req.headers['user-agent'];
  
  // frontend se bheja hua behavior data
  const behaviorData = req.body?._behaviorMeta || req.headers['x-behavior-meta'];
  let timings = {};
  
  if (behaviorData) {
    try {
      timings = typeof behaviorData === 'string' ? JSON.parse(behaviorData) : behaviorData;
    } catch (e) {
      // invalid data, suspicious
      timings = {};
    }
  }

  // check previous requests from this IP
  const recentLogs = await RequestLog.find({ 
    ip, 
    createdAt: { $gte: new Date(Date.now() - 300000) } // last 5 min
  }).limit(20);

  // repeated payload detection
  const payloadHash = JSON.stringify(req.body).slice(0, 100); // simple hash alternative
  const repeatCount = recentLogs.filter(log => 
    log.payloadHash === payloadHash
  ).length;

  // time between similar requests
  let timeBetweenRequests = null;
  const lastSimilar = recentLogs.find(log => log.endpoint === endpoint);
  if (lastSimilar) {
    timeBetweenRequests = Date.now() - new Date(lastSimilar.createdAt).getTime();
  }

  const requestData = {
    ip,
    endpoint,
    userAgent,
    timings: { ...timings, timeBetweenRequests },
    repeatCount,
    payloadHash
  };

  // calculate bot score
  const botScore = calculateBotScore(requestData);

  // log kar rahe hain DB mein
  try {
    await RequestLog.create({
      ip,
      endpoint,
      userAgent,
      botScore,
      behaviorData: timings,
      payloadHash,
      blocked: false
    });
  } catch (err) {
    console.error('Failed to log request:', err);
  }

  // progressive enforcement
  if (botScore >= BOT_SCORE_THRESHOLDS.BLOCK) {
    suspiciousIPs.set(ip, { count: (suspiciousIPs.get(ip)?.count || 0) + 1, lastSeen: Date.now() });
    return res.status(403).json({ 
      error: 'Access temporarily blocked. Contact support if this is a mistake.' 
    });
  }

  if (botScore >= BOT_SCORE_THRESHOLDS.CAPTCHA_REQUIRED) {
    // captcha verification pending hona chahiye
    if (!req.body?.captchaToken) {
      return res.status(429).json({ 
        error: 'Please complete the verification',
        requiresCaptcha: true 
      });
    }
    // yahan actual captcha verification logic aayega (recaptcha etc)
  }

  if (botScore >= BOT_SCORE_THRESHOLDS.RATE_LIMIT) {
    const allowed = checkRateLimit(ip, endpoint);
    if (!allowed) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.' 
      });
    }
  }

  // attach score to request for logging/monitoring
  req.botScore = botScore;
  req.clientIP = ip;

  next();
};

// cleanup function - production mein cron job se run karo
const cleanupOldTracking = () => {
  const now = Date.now();
  const CLEANUP_AGE = 600000; // 10 min

  // in-memory cleanup
  for (const [key, timestamps] of requestTracker.entries()) {
    const recent = timestamps.filter(t => now - t < CLEANUP_AGE);
    if (recent.length === 0) {
      requestTracker.delete(key);
    } else {
      requestTracker.set(key, recent);
    }
  }

  // suspicious IPs cleanup
  for (const [ip, data] of suspiciousIPs.entries()) {
    if (now - data.lastSeen > CLEANUP_AGE) {
      suspiciousIPs.delete(ip);
    }
  }
};

// har 5 min mein cleanup
setInterval(cleanupOldTracking, 300000);

module.exports = { botDetectionMiddleware, BOT_SCORE_THRESHOLDS };
