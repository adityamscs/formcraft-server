import mongoose, { Schema, Document } from 'mongoose';
import { IForm } from '../types';

const questionSchema = new Schema({
  id: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['categorize', 'cloze', 'comprehension'] 
  },
  title: { type: String, required: true },
  image: { type: String },
  required: { type: Boolean, default: false },
  order: { type: Number, required: true },
  
  // Categorize specific fields
  categories: [String],
  items: [{
    id: String,
    text: String,
    category: String
  }],
  
  // Cloze specific fields
  text: String,
  blanks: [{
    id: String,
    correctAnswer: String
  }],
  
  // Comprehension specific fields
  passage: String,
  questions: [{
    id: String,
    question: String,
    type: { type: String, enum: ['multiple-choice', 'text'] },
    options: [String],
    correctAnswer: String
  }]
}, { _id: false });

const formSchema = new Schema<IForm>({
  title: { type: String, required: true },
  description: { type: String },
  headerImage: { type: String },
  questions: [questionSchema],
  isPublished: { type: Boolean, default: false },
  shareLink: { type: String }
}, {
  timestamps: true
});

// Generate share link
formSchema.pre('save', function(next) {
  if (!this.shareLink) {
    this.shareLink = `${this._id}`;
  }
  next();
});

export const Form = mongoose.model<IForm>('Form', formSchema); 