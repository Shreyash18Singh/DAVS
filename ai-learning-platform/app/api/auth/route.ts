import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/server/mongoose';
import User from '../../../lib/server/models/User';
import { signToken } from '../../../lib/server/auth';

export async function POST(req: NextRequest) {
  // Login endpoint (POST with { email, password }) or register when include name
  await connect();
  const body = await req.json();
  const { email, password, name } = body;
  if (!email || !password) return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });

  // if name provided -> register
  if (name) {
    const exists = await User.findOne({ email }).lean();
    if (exists) return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    const user = new User({ name, email, password, role: 'student' });
    await user.save();
    const token = signToken({ id: user._id, email: user.email, role: user.role });
    return NextResponse.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  }

  // login flow
  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  const ok = await user.comparePassword(password);
  if (!ok) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  const token = signToken({ id: user._id, email: user.email, role: user.role });
  return NextResponse.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}
