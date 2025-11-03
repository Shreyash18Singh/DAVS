"use client";
import React from 'react';

function ModuleCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="glass-card p-4">
      <div className="text-sm font-semibold text-yellow-100 gold-gradient">{title}</div>
      <div className="text-xs text-slate-300 mt-2">{desc}</div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-slate-400">Progress</div>
        <div className="w-2/5 bg-slate-800 rounded-full h-2 overflow-hidden">
          <div className="h-2" style={{ width: '62%', background: 'linear-gradient(90deg, var(--saffron), var(--gold-2))' }}></div>
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeDashboard() {
  return (
    <section id="dashboard" className="container-wide mx-auto mt-8 mb-8 z-10">
      <h2 className="dev-heading text-2xl mb-4">Knowledge Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ModuleCard title="Bhagavad Gita Insights" desc="Daily meditations, chapter summaries, and practice prompts." />
        <ModuleCard title="Sanskrit-to-Science" desc="Interpretations connecting shlokas to modern concepts and experiments." />
        <ModuleCard title="AI Summarizer" desc="Auto-generated notes and flashcards for quick revision." />
      </div>
    </section>
  );
}
