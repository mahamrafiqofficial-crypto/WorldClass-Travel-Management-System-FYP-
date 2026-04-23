import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  id: String,
  type: {
    type: String,
    enum: ['hero', 'text', 'features', 'cta', 'testimonials']
  },
  title: String,
  subtitle: String,
  content: String,
  image: String,
  buttonText: String,
  buttonLink: String
});

const PageSchema = new mongoose.Schema({
  id: String,
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: String,
  sections: [SectionSchema],
  seoTitle: String,
  seoDescription: String
});

export default mongoose.model('Page', PageSchema);
