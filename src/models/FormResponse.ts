import mongoose, { Schema } from 'mongoose';
import { IFormResponse } from '../types';

const responseSchema = new Schema({
  questionId: { type: String, required: true },
  answers: { type: Schema.Types.Mixed, required: true }
});

const formResponseSchema = new Schema<IFormResponse>({
  formId: { type: String, required: true, ref: 'Form' },
  responses: [responseSchema],
  userAgent: { type: String },
  ipAddress: { type: String }
}, {
  timestamps: true
});

export const FormResponse = mongoose.model<IFormResponse>('FormResponse', formResponseSchema); 