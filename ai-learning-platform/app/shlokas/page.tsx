"use client";
import React, { useEffect, useState } from 'react';

export default function ShlokasPage() {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    fetch('/seed.json').then(r => r.json()).then(setData).catch(() => setData(null));
  }, []);

  if (!data) return <div className="container-wide mx-auto pt-28">Loading shlokas...</div>;

  return (
    <div className="container-wide mx-auto pt-28 pb-12">
      <h1 className="dev-heading text-3xl mb-6">Shlokas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.shlokas.map((s: any) => (
          <div key={s.id} className="glass-card p-6 text-center">
            <div className="text-2xl font-semibold gold-gradient mb-2">{s.topic}</div>
            <div className="mt-2 text-lg leading-relaxed" style={{ fontFamily: '"Noto Serif Devanagari", serif' }}>
              {s.text}
            </div>
            <div className="mt-3 text-sm text-slate-300">Meaning: <span className="text-slate-200 font-medium">{s.meaning}</span></div>
            <div className="mt-2 text-xs text-slate-500">Related: {s.relatedConcepts.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
