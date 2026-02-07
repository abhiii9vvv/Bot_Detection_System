import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [diagramOpen, setDiagramOpen] = useState(false);

  const toggleItem = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">WEB3TASK</div>
        <button className="nav-toggle" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav-links ${navOpen ? 'open' : ''}`}>
          <a href="tel:6207363626" className="nav-item" title="Phone">
            <span className="nav-icon phone">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.7 3.1 9 3c.4 0 .8.3.9.7l1 4.3c.1.4 0 .8-.3 1.1l-1.5 1.5a12.6 12.6 0 0 0 4.9 4.9l1.5-1.5c.3-.3.7-.4 1.1-.3l4.3 1c.4.1.7.5.7.9l-.1 2.3c0 .5-.4.9-.9 1a15.4 15.4 0 0 1-14-14c-.1-.5.3-1 .8-1Z"/>
              </svg>
            </span>
            <span className="nav-text">Phone</span>
          </a>
          <a href="mailto:abhinavv8975@gmail.com" className="nav-item" title="Email">
            <span className="nav-icon email">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </span>
            <span className="nav-text">Email</span>
          </a>
          <a href="https://linkedin.com/in/abhinavtiwary/" className="nav-item" target="_blank" rel="noreferrer" title="LinkedIn">
            <span className="nav-icon linkedin">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </span>
            <span className="nav-text">LinkedIn</span>
          </a>
          <a href="https://github.com/abhiii9vvv" className="nav-item" target="_blank" rel="noreferrer" title="GitHub">
            <span className="nav-icon github">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </span>
            <span className="nav-text">GitHub</span>
          </a>
          <a href="https://av9.netlify.app" className="nav-item" target="_blank" rel="noreferrer" title="Portfolio">
            <span className="nav-icon globe">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </span>
            <span className="nav-text">Portfolio</span>
          </a>
          <a href="https://drive.google.com/file/d/1AVW86x8rcXmEL48Aned1OXKoYLrAhYr1/view?usp=sharing" className="nav-item" target="_blank" rel="noreferrer" title="Resume">
            <span className="nav-icon resume">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm2-6h8v2H8v-2zm0-3h8v2H8v-2zm0-3h5v2H8V8z"/>
              </svg>
            </span>
            <span className="nav-text">Resume</span>
          </a>
          <a href="https://docs.google.com/document/d/14Ik1Ly4VKEXkvy2E7Qr2NsuJzKBgtPRKK8PN40vzx_E/edit?usp=sharing" className="nav-item" target="_blank" rel="noreferrer" title="Documentation">
            <span className="nav-icon doc">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
              </svg>
            </span>
            <span className="nav-text">Docs</span>
          </a>
        </div>
      </nav>
      <div className="page-layout">

        <div className="container">
          <div className="form-wrapper">
            <LoginForm />
          </div>
        </div>

        <aside className="procedure-panel" aria-label="Backend Bot Detection">
          <div className="side-header">Backend Bot Detection</div>
          
          <div className="diagram-section" onClick={() => setDiagramOpen(true)}>
            <div className="diagram-label">Detection Flow Diagram</div>
            <svg viewBox="0 0 800 600" className="flow-diagram">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3498db" />
                </marker>
              </defs>
              
              {/* User Request */}
              <rect x="320" y="10" width="160" height="40" rx="20" fill="#3498db" />
              <text x="400" y="35" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">User Request</text>
              
              {/* Middleware */}
              <path d="M 360 80 L 400 60 L 440 80 L 400 100 Z" fill="#e74c3c" />
              <text x="400" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Middleware</text>
              
              {/* Headers */}
              <rect x="320" y="130" width="160" height="35" rx="5" fill="#27ae60" />
              <text x="400" y="152" textAnchor="middle" fill="white" fontSize="11">Extract Headers</text>
              
              {/* Analysis Branches */}
              <rect x="50" y="200" width="110" height="30" rx="5" fill="#9b59b6" />
              <text x="105" y="220" textAnchor="middle" fill="white" fontSize="10">User-Agent</text>
              
              <rect x="200" y="200" width="100" height="30" rx="5" fill="#9b59b6" />
              <text x="250" y="220" textAnchor="middle" fill="white" fontSize="10">Rate Limit</text>
              
              <rect x="340" y="200" width="120" height="30" rx="5" fill="#9b59b6" />
              <text x="400" y="220" textAnchor="middle" fill="white" fontSize="10">Behavioral Data</text>
              
              <rect x="500" y="200" width="100" height="30" rx="5" fill="#9b59b6" />
              <text x="550" y="220" textAnchor="middle" fill="white" fontSize="10">Fingerprint</text>
              
              {/* Risk Analysis */}
              <path d="M 360 280 L 400 260 L 440 280 L 400 300 Z" fill="#f39c12" />
              <text x="400" y="285" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Risk Score</text>
              
              {/* Outcomes */}
              <rect x="80" y="350" width="100" height="35" rx="5" fill="#e74c3c" />
              <text x="130" y="372" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Block</text>
              
              <rect x="250" y="350" width="100" height="35" rx="5" fill="#f39c12" />
              <text x="300" y="372" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">CAPTCHA</text>
              
              <rect x="420" y="350" width="100" height="35" rx="5" fill="#27ae60" />
              <text x="470" y="372" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Allow</text>
              
              {/* MongoDB Log */}
              <rect x="280" y="430" width="240" height="40" rx="5" fill="#16a085" />
              <text x="400" y="455" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">Log to MongoDB</text>
              
              {/* Arrows */}
              <line x1="400" y1="50" x2="400" y2="60" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="400" y1="100" x2="400" y2="130" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="350" y1="165" x2="105" y2="200" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <line x1="370" y1="165" x2="250" y2="200" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <line x1="400" y1="165" x2="400" y2="200" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <line x1="430" y1="165" x2="550" y2="200" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              
              <line x1="105" y1="230" x2="380" y2="260" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <line x1="250" y1="230" x2="385" y2="260" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <line x1="400" y1="230" x2="400" y2="260" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              <line x1="550" y1="230" x2="420" y2="260" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
              
              <line x1="370" y1="300" x2="130" y2="350" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="390" y1="300" x2="300" y2="350" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="410" y1="300" x2="470" y2="350" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead)" />
              
              <line x1="130" y1="385" x2="320" y2="430" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="300" y1="385" x2="360" y2="430" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="470" y1="385" x2="440" y2="430" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead)" />
              
              {/* Labels on arrows */}
              <text x="340" y="292" fontSize="9" fill="#e74c3c" fontWeight="600">&gt;70</text>
              <text x="345" y="325" fontSize="9" fill="#f39c12" fontWeight="600">40-70</text>
              <text x="415" y="325" fontSize="9" fill="#27ae60" fontWeight="600">&lt;40</text>
            </svg>
            <div className="diagram-hint">👆 Click to view full diagram</div>
          </div>
          
          <ol className="procedure-list">
            <li>
              <div className="approach-item">
                <span className="approach-summary">Express middleware intercepts all requests and analyzes behavioral fingerprints.</span>
                <button className="view-more-btn" onClick={() => toggleItem(0)}>
                  {expandedItems[0] ? 'View Less' : 'View More'}
                </button>
              </div>
              {expandedItems[0] && (
                <div className="approach-detail">
                  Custom middleware runs on every API call, extracting User-Agent, IP, request headers, and timing metadata. It builds a unique fingerprint per session, logging suspicious patterns like rapid requests or missing browser headers typical of automated scripts.
                </div>
              )}
            </li>
            <li>
              <div className="approach-item">
                <span className="approach-summary">Keystroke timing analysis detects inhuman typing patterns and automation.</span>
                <button className="view-more-btn" onClick={() => toggleItem(1)}>
                  {expandedItems[1] ? 'View Less' : 'View More'}
                </button>
              </div>
              {expandedItems[1] && (
                <div className="approach-detail">
                  Backend calculates intervals between keystrokes. Bots exhibit constant, machine-precise timing (e.g., 50ms per key), while humans show natural variation (80-250ms). Detected anomalies trigger risk scores stored in MongoDB for pattern tracking across sessions.
                </div>
              )}
            </li>
            <li>
              <div className="approach-item">
                <span className="approach-summary">Mouse movement trajectory tracking identifies scripted vs. organic cursor paths.</span>
                <button className="view-more-btn" onClick={() => toggleItem(2)}>
                  {expandedItems[2] ? 'View Less' : 'View More'}
                </button>
              </div>
              {expandedItems[2] && (
                <div className="approach-detail">
                  Server receives X/Y coordinates with timestamps. Bots often produce linear, non-human paths or instant jumps without acceleration curves. Backend compares trajectories against human movement models using velocity and smoothness metrics to flag automation.
                </div>
              )}
            </li>
            <li>
              <div className="approach-item">
                <span className="approach-summary">Rate limiting prevents brute-force attacks by tracking request frequency per IP.</span>
                <button className="view-more-btn" onClick={() => toggleItem(3)}>
                  {expandedItems[3] ? 'View Less' : 'View More'}
                </button>
              </div>
              {expandedItems[3] && (
                <div className="approach-detail">
                  Middleware counts requests per IP/session within sliding time windows. Exceeding thresholds (e.g., 10 requests/minute) triggers temporary bans or CAPTCHA challenges. Redis or in-memory stores cache counters for fast lookups without database overhead.
                </div>
              )}
            </li>
            <li>
              <div className="approach-item">
                <span className="approach-summary">User-Agent and header validation blocks headless browsers and known bot signatures.</span>
                <button className="view-more-btn" onClick={() => toggleItem(4)}>
                  {expandedItems[4] ? 'View Less' : 'View More'}
                </button>
              </div>
              {expandedItems[4] && (
                <div className="approach-detail">
                  Server checks for missing or spoofed headers (Accept-Language, Referer, DNT). Headless browsers (Puppeteer, Selenium) leave identifiable traces. Requests lacking standard browser fingerprints are flagged and logged with risk scores in the RequestLog collection.
                </div>
              )}
            </li>
            <li>
              <div className="approach-item">
                <span className="approach-summary">Behavioral scoring system assigns risk levels based on cumulative anomaly patterns.</span>
                <button className="view-more-btn" onClick={() => toggleItem(5)}>
                  {expandedItems[5] ? 'View Less' : 'View More'}
                </button>
              </div>
              {expandedItems[5] && (
                <div className="approach-detail">
                  Each detection metric contributes to a risk score (0-100). High scores (&gt;70) block access; moderate (40-70) trigger CAPTCHAs; low (&lt;40) allow through. Scores persist in MongoDB, enabling machine learning models to refine thresholds over time.
                </div>
              )}
            </li>
            <li>
              <div className="approach-item">
                <span className="approach-summary">Session fingerprinting tracks device consistency across login attempts.</span>
                <button className="view-more-btn" onClick={() => toggleItem(6)}>
                  {expandedItems[6] ? 'View Less' : 'View More'}
                </button>
              </div>
              {expandedItems[6] && (
                <div className="approach-detail">
                  Backend generates hash from browser fingerprint (canvas, WebGL, fonts, screen resolution). Repeated login attempts with different fingerprints from same IP suggest credential stuffing. Discrepancies lock accounts temporarily and alert admins via logs.
                </div>
              )}
            </li>
          </ol>
        </aside>
      </div>

      <footer className="footer-bar">
        <span className="footer-left">WEB3TASK</span>
        <span className="footer-right">Made by Abhinav</span>
      </footer>

      {diagramOpen && (
        <div className="diagram-modal" onClick={() => setDiagramOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setDiagramOpen(false)}>✕</button>
            <h3>Bot Detection Flow</h3>
            <svg viewBox="0 0 800 600" className="flow-diagram-full">
              <defs>
                <marker id="arrowhead-full" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3498db" />
                </marker>
              </defs>
              
              {/* User Request */}
              <rect x="320" y="10" width="160" height="40" rx="20" fill="#3498db" />
              <text x="400" y="35" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">User Request</text>
              
              {/* Middleware */}
              <path d="M 360 80 L 400 60 L 440 80 L 400 100 Z" fill="#e74c3c" />
              <text x="400" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Middleware</text>
              
              {/* Headers */}
              <rect x="320" y="130" width="160" height="35" rx="5" fill="#27ae60" />
              <text x="400" y="152" textAnchor="middle" fill="white" fontSize="11">Extract Headers & Metadata</text>
              
              {/* Analysis Branches */}
              <rect x="50" y="200" width="110" height="30" rx="5" fill="#9b59b6" />
              <text x="105" y="220" textAnchor="middle" fill="white" fontSize="10">User-Agent</text>
              
              <rect x="200" y="200" width="100" height="30" rx="5" fill="#9b59b6" />
              <text x="250" y="220" textAnchor="middle" fill="white" fontSize="10">Rate Limit</text>
              
              <rect x="340" y="200" width="120" height="30" rx="5" fill="#9b59b6" />
              <text x="400" y="220" textAnchor="middle" fill="white" fontSize="10">Behavioral Data</text>
              
              <rect x="500" y="200" width="100" height="30" rx="5" fill="#9b59b6" />
              <text x="550" y="220" textAnchor="middle" fill="white" fontSize="10">Fingerprint</text>
              
              {/* Risk Analysis */}
              <path d="M 360 280 L 400 260 L 440 280 L 400 300 Z" fill="#f39c12" />
              <text x="400" y="285" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Risk Score</text>
              
              {/* Outcomes */}
              <rect x="80" y="350" width="100" height="35" rx="5" fill="#e74c3c" />
              <text x="130" y="372" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Block (&gt;70)</text>
              
              <rect x="250" y="350" width="100" height="35" rx="5" fill="#f39c12" />
              <text x="300" y="372" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">CAPTCHA (40-70)</text>
              
              <rect x="420" y="350" width="100" height="35" rx="5" fill="#27ae60" />
              <text x="470" y="372" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Allow (&lt;40)</text>
              
              {/* MongoDB Log */}
              <rect x="280" y="430" width="240" height="40" rx="5" fill="#16a085" />
              <text x="400" y="455" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">Log to MongoDB + Analytics</text>
              
              {/* Arrows */}
              <line x1="400" y1="50" x2="400" y2="60" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead-full)" />
              <line x1="400" y1="100" x2="400" y2="130" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead-full)" />
              <line x1="350" y1="165" x2="105" y2="200" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead-full)" />
              <line x1="370" y1="165" x2="250" y2="200" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead-full)" />
              <line x1="400" y1="165" x2="400" y2="200" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead-full)" />
              <line x1="430" y1="165" x2="550" y2="200" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead-full)" />
              
              <line x1="105" y1="230" x2="380" y2="260" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead-full)" />
              <line x1="250" y1="230" x2="385" y2="260" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead-full)" />
              <line x1="400" y1="230" x2="400" y2="260" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead-full)" />
              <line x1="550" y1="230" x2="420" y2="260" stroke="#3498db" strokeWidth="1.5" markerEnd="url(#arrowhead-full)" />
              
              <line x1="370" y1="300" x2="130" y2="350" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead-full)" />
              <line x1="390" y1="300" x2="300" y2="350" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead-full)" />
              <line x1="410" y1="300" x2="470" y2="350" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead-full)" />
              
              <line x1="130" y1="385" x2="320" y2="430" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead-full)" />
              <line x1="300" y1="385" x2="360" y2="430" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead-full)" />
              <line x1="470" y1="385" x2="440" y2="430" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead-full)" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
