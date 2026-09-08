const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ message: 'Server misconfiguration: ADMIN_PASSWORD not set.' });
  }

  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  const token = jwt.sign(
    { username, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token, username });
});

// GET /api/auth/verify — Check if token is valid
router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ valid: false });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true });
  } catch {
    res.status(401).json({ valid: false });
  }
});

module.exports = router;
