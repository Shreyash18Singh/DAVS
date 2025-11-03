"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import BackButton from '../components/BackButton';

export default function CoursesPage() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    fetch('/seed.json').then(r => r.json()).then(setData).catch(() => setData(null));
  }, []);

  if (!data) return <div className="container-wide mx-auto pt-28">Loading courses...</div>;

  return (
    <div className="container-wide mx-auto pt-28 pb-12">
      <div className="mb-4"><BackButton /></div>
      <h1 className="dev-heading text-3xl mb-4">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.courses.map((c: any) => (
          <div key={c.id} className="glass-card overflow-hidden">
            {c.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.image} alt={c.title} className="w-full h-44 object-cover" />
            )}
            <div className="p-4">
              <div className="text-lg font-semibold gold-gradient">{c.title}</div>
              <div className="text-xs text-slate-300 mt-1">By {c.instructor} • {c.duration} • {c.level}</div>
              <div className="text-sm text-slate-300 mt-2">{c.description}</div>

              <div className="mt-3">
                {c.modules.map((m: any) => (
                  <div key={m.id} className="border-t border-slate-800/20 pt-2 mt-2">
                    <div className="font-semibold">{m.title}</div>
                    <div className="text-xs text-slate-400">{m.content}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Link href={`/courses/${c.id}`} className="text-sm text-slate-900 bg-yellow-400 px-3 py-1 rounded-md">Open</Link>
                <div className="text-xs text-slate-400">Tags: {c.tags.join(', ')}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
