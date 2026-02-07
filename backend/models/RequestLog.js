const mongoose = require('mongoose');

const requestLogSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    index: true
  },
  endpoint: {
    type: String,
    required: true
  },
  userAgent: String,
  botScore: {
    type: Number,
    default: 0,
    index: true
  },
  behaviorData: {
    timeToSubmit: Number,
    mouseMovements: Number,
    scrolled: Boolean,
    keystrokes: Number
  },
  payloadHash: String,
  blocked: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800 // auto-delete after 7 days
  }
});

// composite index for faster queries
requestLogSchema.index({ ip: 1, createdAt: -1 });
requestLogSchema.index({ botScore: 1, createdAt: -1 });

module.exports = mongoose.model('RequestLog', requestLogSchema);
