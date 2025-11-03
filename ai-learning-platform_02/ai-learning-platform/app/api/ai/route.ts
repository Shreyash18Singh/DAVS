import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/server/mongoose';
import { askGyaanGuru, summarizeText } from '../../../lib/server/aiService';
import { verifyToken } from '../../../lib/server/auth';

async function requireAuth(req: NextRequest) {
  const auth = req.headers.get('authorization') || '';
  if (!auth) return null;
  const parts = auth.split(' ');
  if (parts.length !== 2) return null;
  const token = parts[1];
  return verifyToken(token);
}

export async function POST(req: NextRequest) {
  await connect();
  const url = new URL(req.url);
  if (url.pathname.endsWith('/api/ai/ask')) {
    const user = await requireAuth(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const { question, context } = body;
    if (!question) return NextResponse.json({ message: 'Missing question' }, { status: 400 });
    const prompt = `Question: ${question}\nContext: ${context || ''}\nRespond as an empathetic, concise tutor.`;
    const answer = await askGyaanGuru(prompt);
    return NextResponse.json({ answer });
  }

  if (url.pathname.endsWith('/api/ai/summarize')) {
    const user = await requireAuth(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const { text } = await req.json();
    if (!text) return NextResponse.json({ message: 'Missing text' }, { status: 400 });
    const summary = await summarizeText(text);
    return NextResponse.json({ summary });
  }

  return NextResponse.json({ message: 'Not found' }, { status: 404 });
}
