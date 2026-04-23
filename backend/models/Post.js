import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  id: String,
  title: String,
  excerpt: String,
  content: String,
  author: String,
  date: String,
  image: String,
  tags: [String]
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);
