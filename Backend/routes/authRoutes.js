const express = require('express');
const passport = require("passport");
const { register, login, forgotPassword } = require('../controllers/authController');

const router = express.Router();

// Signup, Login, Forgot Password
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

// LinkedIn Login
router.get("/api/auth/linkedin", passport.authenticate("linkedin"));

// LinkedIn Callback
router.get("/api/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/well.html",  // your dashboard
    failureRedirect: "/login.html" // in case of login failure
  })
);

module.exports = router;
