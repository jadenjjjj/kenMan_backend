require('dotenv').config();

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../models/userModel');

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};


console.log("JWT_SECRET:", process.env.JWT_SECRET);


passport.use(
    new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.userId);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
  

module.exports = passport;
