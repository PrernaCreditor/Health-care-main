const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Common fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  // Optional for Google users
  password: { type: String }, // optional for Google
  googleId: { type: String },
  photo: { type: String },

  // Optional Preferences
  healthUpdates: { type: Boolean, default: false },

  // ✅ New Profile Info
  location: { type: String },
  birthday: { type: String },
  healthGoals: { type: String },

  // ✅ New Preferences
  dietaryPreferences: { type: [String], default: [] },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
  },
  //Linkedin Entries
  linkedinId: {
  type: String,
  unique: true,
  sparse: true
},


  // ✅ Optional user stats
  wellnessDays: { type: Number, default: 0 },
  goalsAchieved: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
