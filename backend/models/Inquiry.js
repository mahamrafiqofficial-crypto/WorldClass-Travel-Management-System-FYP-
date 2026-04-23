import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  id: String,
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: String,
  status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' }
}, { timestamps: true });

export default mongoose.model('Inquiry', InquirySchema);
