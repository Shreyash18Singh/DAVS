import mongoose, { Schema, Document } from 'mongoose';

export interface IShloka extends Document {
  topic: string;
  text: string;
  meaning?: string;
  interpretation?: string;
  relatedConcepts: string[];
}

const ShlokaSchema: Schema = new Schema<IShloka>({
  topic: { type: String, required: true },
  text: { type: String, required: true },
  meaning: { type: String },
  interpretation: { type: String },
  relatedConcepts: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.models.Shloka || mongoose.model<IShloka>('Shloka', ShlokaSchema);
