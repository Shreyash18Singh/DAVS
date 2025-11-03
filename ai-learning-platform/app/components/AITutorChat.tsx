"use client";
import { useState, useRef, useEffect } from 'react';

export default function AITutorChat() {
  const [messages, setMessages] = useState<{role: string, text: string}[]>([
    { role: 'assistant', text: 'Welcome — ask me about a shloka, request a summary, or get study suggestions.' }
  ]);
  const [value, setValue] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const mockAsk = (question: string) => {
    // simple heuristics: if mentions 'shloka' or 'Aham' return shloka explanation
    const q = question.toLowerCase();
    if (q.includes('ahm') || q.includes('aham') || q.includes('ahm') || q.includes('brahm')) {
      return 'Aham Brahmasmi means "I am Brahman" — the teaching points to the non-dual identity of individual consciousness with universal consciousness.';
    }
    if (q.includes('summar') || q.includes('explain')) {
      return 'Summary (demo): Focus on core concepts, write a 3-line reflection, and practice one breathing exercise.';
    }
    return `Gyaan Guru (demo): Reflect on "${question}". Try to restate the idea in one sentence.`;
  };

  const send = async () => {
    if (!value.trim()) return;
    const userMsg = { role: 'user', text: value };
    setMessages(prev => [...prev, userMsg]);
    setValue('');
    setTimeout(() => {
      const reply = mockAsk(userMsg.text);
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    }, 700 + Math.random() * 400);
  }

  return (
    <section className="container-wide mx-auto mt-10 mb-10 z-10">
      <div className="glass-card p-4 shadow-lg">
        <h3 className="dev-heading text-xl">AI Tutor Chat</h3>
        <p className="text-sm text-slate-300/80 mt-1">Ask about shlokas, get summaries, and personalized study paths.</p>

        <div className="mt-4 h-64 overflow-auto p-3 bg-transparent border border-transparent rounded-md">
          {messages.map((m, i) => (
            <div key={i} className={`mb-3 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block max-w-full md:max-w-lg px-3 py-2 rounded-md ${m.role === 'user' ? 'bg-yellow-400 text-slate-900' : 'bg-slate-900 text-slate-200'}`}>{m.text}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="mt-3 flex gap-2">
          <input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} className="flex-1 p-2 rounded-md bg-slate-800 text-slate-100" placeholder="Ask about a shloka or request a summary..." />
          <button onClick={send} className="px-4 py-2 rounded-md font-semibold" style={{ background: 'linear-gradient(90deg, var(--saffron), var(--gold-2))', color: '#0b1720' }}>Send</button>
        </div>
      </div>
    </section>
  );
}
