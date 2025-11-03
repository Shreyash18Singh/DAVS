"use client";
import React, { useEffect, useState } from 'react';

type Question = {
  id: string;
  question: string;
  options: string[];
  answer: number;
};

export default function Quiz({ courseId, moduleId, questions, onDone }: { courseId: string; moduleId: string; questions: Question[]; onDone?: () => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  }, [courseId, moduleId]);

  if (!questions || questions.length === 0) return <div className="text-slate-400">No quiz available for this module.</div>;

  const q = questions[index];

  function handleNext() {
    if (selected === null) return;
    if (selected === q.answer) setScore(s => s + 1);
    const next = index + 1;
    if (next >= questions.length) {
      finishQuiz();
    } else {
      setIndex(next);
      setSelected(null);
    }
  }

  function finishQuiz() {
    const total = questions.length;
    const percent = Math.round(( (selected === q.answer ? score + 1 : score) / total ) * 100);

    // persist to localStorage under key 'gg_progress'
    try {
      const raw = localStorage.getItem('gg_progress');
      const state = raw ? JSON.parse(raw) : {};
      if (!state[courseId]) state[courseId] = {};
      state[courseId][moduleId] = { completed: true, score: percent };
      localStorage.setItem('gg_progress', JSON.stringify(state));
    } catch (e) {
      console.warn('Could not persist progress', e);
    }

    setShowResult(true);
  }

  return (
    <div className="glass-card p-4">
      {!showResult ? (
        <div>
          <div className="text-sm text-slate-400 mb-2">Question {index + 1} / {questions.length}</div>
          <div className="font-semibold text-lg mb-4">{q.question}</div>

          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`text-left p-3 rounded-md border ${isSelected ? 'border-yellow-400 bg-yellow-50/10' : 'border-transparent hover:border-slate-700'} transition`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={handleNext} className="px-4 py-2 rounded-md bg-peach text-slate-900 font-semibold">{index + 1 === questions.length ? 'Finish' : 'Next'}</button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-2xl font-semibold">Result</div>
          <div className="mt-2 text-slate-300">Score: {score}/{questions.length}</div>
          <div className="mt-4">
            <button onClick={() => { setShowResult(false); onDone && onDone(); }} style={{ background: 'linear-gradient(90deg,var(--gold-1),var(--gold-2))' }} className="px-4 py-2 rounded-md text-slate-900 font-semibold">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
