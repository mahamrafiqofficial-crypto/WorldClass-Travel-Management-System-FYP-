import mongoose from 'mongoose';

const ThemeSchema = new mongoose.Schema({
  primaryColor: String,
  secondaryColor: String,
  accentColor: String,
  fontFamilySans: String,
  fontFamilySerif: String
});

export default mongoose.model('Theme', ThemeSchema);
