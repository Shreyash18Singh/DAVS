import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description?: string;
  modules: { title: string; content: string; shloka?: mongoose.Types.ObjectId }[];
  createdBy?: mongoose.Types.ObjectId;
  tags?: string[];
}

const ModuleSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  shloka: { type: Schema.Types.ObjectId, ref: 'Shloka' },
});

const CourseSchema: Schema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String },
  modules: { type: [ModuleSchema], default: [] },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
