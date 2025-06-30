const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const contactRoute = require('./routes/contact');
const wellnessRoutes = require('./routes/wellness');

const app = express();

// Middleware
app.use(cors({
  origin: "https://prernacreditor.github.io", // your GitHub Pages frontend
  credentials: true,
}));
app.use(express.json());

// Session middleware (required for Passport)
app.use(session({
  secret: 'vitapure_google_login_secret', // change this in production
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,       // from .env
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://health-care-main.onrender.com/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  console.log("✅ Google User:", profile.displayName);
  // Optionally: save to DB here
  return done(null, profile);
}));

// ======= Routes ======= //
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoute);
app.use('/api/wellness', wellnessRoutes);

// Google Auth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // On success, redirect to frontend dashboard
    res.redirect('https://prernacreditor.github.io/Health-care-main/dashboard.html');
  }
);

// Authenticated API route example
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  } else {
    return res.status(401).json({ message: 'Not logged in' });
  }
});

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('https://prernacreditor.github.io/Health-care-main/');
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
