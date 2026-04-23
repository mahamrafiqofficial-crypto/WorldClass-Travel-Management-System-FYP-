import express from 'express';
import Page from '../models/Page.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pages = await Page.find();
    // Return as dictionary keyed by slug for frontend compatibility
    const pageDict = {};
    pages.forEach(p => {
      pageDict[p.slug] = p;
    });
    res.json(pageDict);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:slug', async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, upsert: true } // Create if doesn't exist
    );
    res.json(page);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
