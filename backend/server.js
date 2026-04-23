import * as dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import pageRoutes from './routes/pageRoutes.js';
import postRoutes from './routes/postRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import themeRoutes from './routes/themeRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/theme', themeRoutes);

const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('MONGO_URI:', MONGO_URI ? 'Found' : 'NOT FOUND');

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });