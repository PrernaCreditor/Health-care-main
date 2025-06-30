const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // For both local and Google users
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  // Optional for Google users
  password: { type: String }, // make password optional

  // For Google users only
  googleId: { type: String }, // unique identifier from Google
  photo: { type: String }, // Google profile picture URL

  // Optional preferences
  healthUpdates: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
