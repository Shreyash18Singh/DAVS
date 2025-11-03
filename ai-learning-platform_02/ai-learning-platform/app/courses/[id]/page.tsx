"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import BackButton from '../../components/BackButton';

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
      <div className="mb-4"><BackButton /></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-6">
        <div className="md:col-span-1">
          {course.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-md shadow-lg" />
          )}
          <div className="mt-3 text-xs text-slate-400">By {course.instructor}</div>
          <div className="text-xs text-slate-400">{course.duration} • {course.level}</div>
        </div>
        <div className="md:col-span-2">
          <h1 className="dev-heading text-3xl">{course.title}</h1>
          <div className="text-sm text-slate-200 mt-3 glass-card p-4">{course.description}</div>
        </div>
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
