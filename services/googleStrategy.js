const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/api/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = new User({
        email,
        name: profile.displayName,
      });

      // Save user's Google ID and access token
      user.googleId = profile.id;
      user.googleAccessToken = accessToken;
      
      await user.save();
      done(null, user);
    } catch (error) {
      done(error, false, error.message);
    }
  }
));

module.exports = passport;
