const mongoose = require('mongoose');

const wellnessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  program: String,
  message: { type: String, required: true },
  goal: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Wellness', wellnessSchema);
