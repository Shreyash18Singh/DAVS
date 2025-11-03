"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    fetch('/seed.json').then(r => r.json()).then(setData).catch(() => setData(null));
  }, [id]);

  if (!data) return <div className="container-wide mx-auto pt-28">Loading course...</div>;

  const course = data.courses.find((c: any) => c.id === id);
  if (!course) return <div className="container-wide mx-auto pt-28">Course not found.</div>;

  return (
    <div className="container-wide mx-auto pt-28 pb-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="dev-heading text-3xl">{course.title}</h1>
        <div className="text-sm text-slate-400">Tags: {course.tags.join(', ')}</div>
      </div>

      <div className="glass-card p-6 mb-6">
        <p className="text-slate-200">{course.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {course.modules.map((m: any) => (
          <div key={m.id} className="glass-card p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold gold-gradient">{m.title}</div>
                <div className="text-xs text-slate-400 mt-1">{m.content}</div>
              </div>
              <div className="flex flex-col items-end">
                <Link href={`/courses/${id}/module/${m.id}`} className="bg-peach text-slate-900 px-3 py-1 rounded-md text-sm">Open</Link>
                <div className="text-xs text-slate-500 mt-2">Shloka: {m.shlokaId}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
