import { NextRequest, NextResponse } from 'next/server';
import { getSubtitles } from 'youtube-caption-extractor';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const videoID = url.searchParams.get('videoID');
  const lang = url.searchParams.get('lang') || 'en';
  if (!videoID) return NextResponse.json({ error: 'Missing videoID' }, { status: 400 });
  try {
    const subs = await getSubtitles({ videoID, lang });
    const text = subs.map(s => s.text).join(' ');
    return NextResponse.json({ text });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch subtitles' }, { status: 500 });
  }
}
