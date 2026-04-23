import express from 'express';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ date: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const inquiry = new Inquiry(req.body);
  try {
    const newInquiry = await inquiry.save();
    res.status(201).json(newInquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!inquiry) {
      const inquiryById = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!inquiryById) return res.status(404).json({ message: 'Inquiry not found' });
      return res.json(inquiryById);
    }
    res.json(inquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
