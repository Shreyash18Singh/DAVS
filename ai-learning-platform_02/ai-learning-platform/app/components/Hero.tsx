"use client";
import Link from "next/link";
import OmSVG from "./OmAnimation";


export default function Hero() {
  return (
    <section className="relative mandala-bg pt-28 pb-12">
      <div className="light-rays"></div>
      <svg className="mandala-svg" viewBox="0 0 800 600" aria-hidden>
        <g transform="translate(400,280)" fill="none" stroke="rgba(255,230,180,0.06)" strokeWidth="1">
          <circle r="220" />
          <circle r="160" />
          <circle r="100" />
          <g opacity="0.06">
            <path d="M0,-220 L0,220 M-220,0 L220,0 M-155,-155 L155,155 M-155,155 L155,-155" />
          </g>
        </g>
      </svg>
      {/* decorative glowing spheres */}
      <div className="data-sphere saffron" style={{ left: '-6%', top: '10%' }} />
      <div className="data-sphere gold pulse" style={{ right: '-10%', top: '6%', width: 220, height: 220 }} />
      <div className="data-sphere peach" style={{ left: '40%', bottom: '-8%', width: 200, height: 200 }} />

      <div className="container-wide mx-auto flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="w-full md:w-6/12 z-10">
          <h1 className="text-4xl md:text-5xl font-bold dev-heading leading-tight">Gyaan Guru — Illuminate Your Inner Knowledge</h1>
          <p className="mt-4 text-lg text-slate-200/85">AI-Powered Tutor Inspired by the Timeless Wisdom of the Shlokas.</p>

          <div className="mt-6 flex items-center gap-4">
            <Link href="/courses" className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 font-semibold shadow-lg glass-card">Start Learning</Link>
            <a className="px-5 py-3 text-sm border border-yellow-300/20 rounded-lg text-yellow-200" href="#dashboard">Knowledge Dashboard</a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="glass-card p-3">
              <div className="text-sm text-yellow-100/90 font-semibold">Bhagavad Gita Insights</div>
              <div className="text-xs text-slate-300 mt-1">Meditative summaries & practical lessons</div>
            </div>
            <div className="glass-card p-3">
              <div className="text-sm text-yellow-100/90 font-semibold">Sanskrit-to-Science</div>
              <div className="text-xs text-slate-300 mt-1">Connecting shlokas with modern ideas</div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-6/12 flex items-center justify-center z-10">
          <div className="om-wrap">
            <OmSVG />
            <span className="floating-word" style={{ left: '-10%', top: '10%' }}>Gyaan</span>
            <span className="floating-word" style={{ right: '-8%', bottom: '8%', fontSize: 22 }}>Dhyana</span>
            <span className="floating-word" style={{ left: '30%', bottom: '-6%' }}>Shravan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
