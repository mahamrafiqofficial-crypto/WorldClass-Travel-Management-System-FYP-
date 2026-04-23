import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey_change_in_production';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided!' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or Expired Token' });
    req.user = user;
    next();
  });
};

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    admin = new Admin({ email, password });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, message: 'Logged in successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;