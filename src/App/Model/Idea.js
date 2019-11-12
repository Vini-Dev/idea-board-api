import mongoose from 'mongoose';

const IdeaSchema = new mongoose.Schema({
  title: String,
  text: String,
  created_at: Date,
  created_by: Number,
  updated_at: Date,
});

export default mongoose.model('ideas', IdeaSchema);
