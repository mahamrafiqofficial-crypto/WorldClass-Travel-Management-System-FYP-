import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const post = new Post(req.body);
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!post) {
      // Try by Mongo ID if custom id not found
      const postById = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!postById) return res.status(404).json({ message: 'Post not found' });
      return res.json(postById);
    }
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ id: req.params.id });
    if (!post) {
       await Post.findByIdAndDelete(req.params.id);
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
