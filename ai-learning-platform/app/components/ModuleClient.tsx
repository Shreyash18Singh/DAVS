"use client";
import React, { useEffect, useState } from 'react';
import Quiz from './Quiz';

export default function ModuleClient({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const [data, setData] = useState<any | null>(null);
  const [module, setModule] = useState<any | null>(null);
  const [shloka, setShloka] = useState<any | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    fetch('/seed.json').then(r => r.json()).then(d => {
      setData(d);
      const course = d.courses.find((c: any) => c.id === courseId);
      if (course) {
        const mod = course.modules.find((m: any) => m.id === moduleId);
        setModule(mod || null);
        if (mod && mod.shlokaId) {
          const s = d.shlokas.find((ss: any) => ss.id === mod.shlokaId);
          setShloka(s || null);
        }
      }
    }).catch(() => setData(null));
  }, [courseId, moduleId]);

  if (!data) return <div className="container-wide mx-auto pt-28">Loading module...</div>;
  if (!module) return <div className="container-wide mx-auto pt-28">Module not found.</div>;

  return (
    <div className="container-wide mx-auto pt-28 pb-12">
      <div className="glass-card p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold gold-gradient">{module.title}</h2>
            <p className="text-slate-300 mt-2">{module.content}</p>
          </div>
          <div className="text-xs text-slate-400">Course: {courseId}</div>
        </div>
      </div>

      {shloka && (
        <div className="glass-card p-4 mb-6">
          <div className="font-semibold">Related Shloka</div>
          <div className="mt-2 text-slate-200">{shloka.text}</div>
          <div className="mt-2 text-xs text-slate-400">Meaning: {shloka.meaning}</div>
        </div>
      )}

      <div className="mb-6">
        {!showQuiz ? (
          <button
              onClick={() => setShowQuiz(true)}
              style={{ background: 'linear-gradient(90deg,var(--gold-1),var(--gold-2))' }}
              className="px-4 py-2 rounded-md text-slate-900 font-semibold"
            >
              Start Quiz
            </button>
        ) : (
          <Quiz courseId={courseId} moduleId={moduleId} questions={module.quiz || []} onDone={() => setShowQuiz(false)} />
        )}
      </div>
    </div>
  );
}
