import { NextRequest, NextResponse } from 'next/server';
import { connect } from '../../../lib/server/mongoose';
import User from '../../../lib/server/models/User';
import Shloka from '../../../lib/server/models/Shloka';
import Course from '../../../lib/server/models/Course';

const SEED_SECRET = process.env.SEED_SECRET || 'devseed';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const secret = url.searchParams.get('secret');
  if (process.env.NODE_ENV !== 'development' && secret !== SEED_SECRET) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  await connect();

  const demoEmail = 'demo@gyaanguru.com';
  let demoUser = await User.findOne({ email: demoEmail });
  if (!demoUser) {
    demoUser = new User({ name: 'Demo Student', email: demoEmail, password: 'demo123', role: 'student' });
    await demoUser.save();
  }

  const s1 = await Shloka.findOneAndUpdate({ text: 'अहं ब्रह्मास्मि (Aham Brahmasmi) — I am Brahman.' }, {
    topic: 'Self / Atman', text: 'अहं ब्रह्मास्मि (Aham Brahmasmi) — I am Brahman.', meaning: 'Identity of self and Brahman', interpretation: 'Non-dual awareness', relatedConcepts: ['Advaita']
  }, { upsert: true, new: true });

  const s2 = await Shloka.findOneAndUpdate({ text: 'सर्वेन्द्रियाणि संयम्य...' }, {
    topic: 'Integration', text: 'सर्वेन्द्रियाणि संयम्य...', meaning: 'Integration of senses', interpretation: 'Multimodal integration', relatedConcepts: ['multimodal']
  }, { upsert: true, new: true });

  const courseTitle = 'Bhakti & Insight — Demo Course';
  let course = await Course.findOne({ title: courseTitle });
  if (!course) {
    course = new Course({ title: courseTitle, description: 'A demo course', modules: [ { title: 'Intro to Atman', content: 'Reflective practice', shloka: s1._id }, { title: 'Integration', content: 'Exercises', shloka: s2._id } ], createdBy: demoUser._id, tags: ['demo'] });
    await course.save();
  }

  return NextResponse.json({ message: 'Seed complete', demoUser: demoUser.email, course: course.title });
}
