const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const User = require("./models/User");
require("dotenv").config();

const isLocal = process.env.NODE_ENV !== 'production';

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: isLocal
      ? "http://localhost:8000/auth/linkedin/callback"
      : "https://health-care-main.onrender.com/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ linkedinId: profile.id });

        if (!user) {
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                linkedinId: profile.id,
                photo: profile.photos?.[0]?.value || null
            });
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));
