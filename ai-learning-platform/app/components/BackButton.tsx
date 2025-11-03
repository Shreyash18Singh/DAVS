"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function BackButton({ label = 'Back' }: { label?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      aria-label="Go back"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/10 hover:bg-slate-900/20 text-sm"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-slate-100">{label}</span>
    </button>
  );
}
