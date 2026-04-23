import express from 'express';
import Theme from '../models/Theme.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const theme = await Theme.findOne();
    if (!theme) {
      // Default theme if none exists
      return res.json({
        primaryColor: '#3B82F6',
        secondaryColor: '#1E40AF',
        accentColor: '#F59E0B',
        fontFamilySans: 'Inter, sans-serif',
        fontFamilySerif: 'Merriweather, serif'
      });
    }
    res.json(theme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const theme = await Theme.findOne();
    if (theme) {
      const updatedTheme = await Theme.findByIdAndUpdate(theme._id, req.body, { new: true });
      return res.json(updatedTheme);
    } else {
      const newTheme = new Theme(req.body);
      const savedTheme = await newTheme.save();
      return res.json(savedTheme);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
