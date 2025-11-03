import mongoose, { Schema, Document } from 'mongoose';

export interface IProgress extends Document {
  user: mongoose.Types.ObjectId;
  module: string;
  score?: number;
  meta?: any;
}

const ProgressSchema: Schema = new Schema<IProgress>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  module: { type: String, required: true },
  score: { type: Number, default: 0 },
  meta: { type: Schema.Types.Mixed },
}, { timestamps: true });

export default mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);
