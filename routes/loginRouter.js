const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('../services/passport');
const User = require('../models/userModel');

// Log in a user with email and password
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, async (err, user, info) => {
      try {
        if (err || !user) {
          throw new Error('Invalid credentials');
        }
  
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  
        res.json({ token });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    })(req, res, next);
  });

module.exports = router;
