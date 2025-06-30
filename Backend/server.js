const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const User = require('./models/User'); // make sure this is updated for Google login support
const authRoutes = require('./routes/authRoutes');
const contactRoute = require('./routes/contact');
const wellnessRoutes = require('./routes/wellness');

const app = express();

// Detect environment
const isLocal = process.env.NODE_ENV !== 'production';

// Middleware
app.use(cors({
  origin: isLocal
    ? "http://localhost:3000"
    : "https://prernacreditor.github.io",
  credentials: true,
}));
app.use(express.json());

// Session middleware (required for Passport)
app.use(session({
  secret: 'vitapure_google_login_secret', // Replace in production!
  resave: false,
  saveUninitialized: false,
}));

// Passport config
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: isLocal
    ? "http://localhost:8000/auth/google/callback"
    : "https://health-care-main.onrender.com/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Try to find existing user
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      // Check if user with same email exists
      user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        // Link Google account
        user.googleId = profile.id;
        user.photo = profile.photos[0].value;
      } else {
        // Create new Google user
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          photo: profile.photos[0].value,
        });
      }

      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// ======= Routes ======= //
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoute);
app.use('/api/wellness', wellnessRoutes);

// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const redirectURL = isLocal
      ? 'http://localhost:3000/dashboard.html'
      : 'https://prernacreditor.github.io/Health-care-main/dashboard.html';
    res.redirect(redirectURL);
  }
);

// Authenticated API route
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  } else {
    return res.status(401).json({ message: 'Not logged in' });
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    const redirectURL = isLocal
      ? 'http://localhost:3000/login.html'
      : 'https://prernacreditor.github.io/Health-care-main/';
    res.redirect(redirectURL);
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
