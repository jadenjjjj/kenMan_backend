const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('../services/googleStrategy');
const User = require('../models/userModel');


const router = express.Router();

// Local authentication
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const payload = { userId: req.user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// Google authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  const payload = { userId: req.user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
});


module.exports = router;

