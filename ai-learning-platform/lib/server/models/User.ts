import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
  learningHistory: mongoose.Types.ObjectId[];
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], default: 'student' },
  learningHistory: [{ type: Schema.Types.ObjectId, ref: 'Progress' }],
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  const user = this as any;
  if (!user.isModified || !user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
}

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
