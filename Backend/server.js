const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
require("./passport"); // Includes LinkedIn strategy

const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const contactRoute = require('./routes/contact');
const wellnessRoutes = require('./routes/wellness');

const app = express();

// Detect environment
const isLocal = process.env.NODE_ENV !== 'production';

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:5500",
    "https://prernacreditor.github.io"
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions (required for Passport)
app.use(session({
  secret: 'vitapure_google_login_secret',
  resave: false,
  saveUninitialized: false,
}));

// Passport config
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Google Strategy (already present)
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: isLocal
    ? "http://localhost:8000/auth/google/callback"
    : "https://health-care-main.onrender.com/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        user.googleId = profile.id;
        user.photo = profile.photos[0].value;
      } else {
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

// ======= Google OAuth ======= //
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const redirectURL = isLocal
      ? 'http://localhost:3000/well.html'
      : 'https://prernacreditor.github.io/Health-care-main/well.html';
    res.redirect(redirectURL);
  }
);

// ======= LinkedIn OAuth ======= //
app.get('/auth/linkedin',
  passport.authenticate('linkedin')
);

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/' }),
  (req, res) => {
    const redirectURL = isLocal
      ? 'http://localhost:3000/well.html'
      : 'https://prernacreditor.github.io/Health-care-main/well.html';
    res.redirect(redirectURL);
  }
);

// ======= Protected Route ======= //
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  } else {
    return res.status(401).json({ message: 'Not logged in' });
  }
});

// ======= Logout ======= //
app.get('/logout', (req, res) => {
  req.logout(() => {
    const redirectURL = isLocal
      ? 'http://localhost:3000/login.html'
      : 'https://prernacreditor.github.io/Health-care-main/';
    res.redirect(redirectURL);
  });
});

// ======= MongoDB ======= //
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// ======= Start Server ======= //
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
