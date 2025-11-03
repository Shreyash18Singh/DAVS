"use client";
import React, { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [data, setData] = useState<any | null>(null);
  const [localProgress, setLocalProgress] = useState<any | null>(null);

  useEffect(() => {
    fetch('/seed.json').then(r => r.json()).then(setData).catch(() => setData(null));
    try {
      const raw = localStorage.getItem('gg_progress');
      setLocalProgress(raw ? JSON.parse(raw) : null);
    } catch (e) {
      setLocalProgress(null);
    }
  }, []);

  if (!data) return <div className="container-wide mx-auto pt-28">Loading dashboard...</div>;

  const user = data.user;
  // merge progress: compute percent per course using localProgress if available
  const mergedProgress: Record<string, number> = {};
  if (data && data.courses) {
    data.courses.forEach((c: any) => {
      const total = c.modules.length;
      let completed = 0;
      if (localProgress && localProgress[c.id]) {
        const modState = localProgress[c.id];
        completed = Object.keys(modState).filter(k => modState[k]?.completed).length;
      } else if (user && user.progress && typeof user.progress[c.id] === 'number') {
        // fallback: use seed percentage
        mergedProgress[c.id] = user.progress[c.id];
        return;
      }
      mergedProgress[c.id] = Math.round((completed / Math.max(1, total)) * 100);
    });
  }
  return (
    <div className="container-wide mx-auto pt-28 pb-12">
      <h1 className="dev-heading text-3xl mb-4">Knowledge Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-4">
          <div className="text-sm text-yellow-100/90 font-semibold gold-gradient">Welcome, {user.name}</div>
          <div className="text-xs text-slate-300 mt-2">Email: {user.email}</div>
          <div className="mt-4 text-sm">Recommended for you</div>
          <div className="mt-2 text-xs text-slate-400">Bhagavad Gita Insights — daily micro-lessons</div>
        </div>

        <div className="glass-card p-4">
          <div className="text-sm font-semibold">Your Progress</div>
          <div className="mt-2 text-xs text-slate-400">{Object.keys(user.progress).map(k => (
            <div key={k} className="mt-2">
              <div className="text-sm font-semibold">{k}</div>
              <div className="w-full bg-slate-800 rounded-full h-2 mt-1"><div className="h-2 rounded-full" style={{ width: `${mergedProgress[k] ?? user.progress[k]}%`, background: 'linear-gradient(90deg,var(--saffron),var(--gold-2))' }} /></div>
              <div className="text-xs text-slate-500 mt-1">{mergedProgress[k] ?? user.progress[k]}% complete</div>
            </div>
          ))}</div>
        </div>

        <div className="glass-card p-4">
          <div className="text-sm font-semibold">Spiritual Insights</div>
          <div className="mt-2 text-xs text-slate-400">Daily reflection: "Let knowledge be a lamp within."</div>
        </div>
      </div>
    </div>
  );
}
