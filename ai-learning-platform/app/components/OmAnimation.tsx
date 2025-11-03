"use client";
import React from 'react';

export default function OmAnimation() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* decorative rings */}
      <div className="absolute inset-0 rounded-full ring-outer" />
      <div className="absolute inset-4 rounded-full ring-mid" />

      {/* Om glyph (will fade/scale during morph) */}
      <div className="om-glyph relative z-10">ॐ</div>

      {/* Morph nodes: start overlapping Om, then fly out into neural positions */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9962D" />
            <stop offset="100%" stopColor="#FFD54A" />
          </linearGradient>
        </defs>

        {/* lines (draw in) */}
        <line className="morph-line" x1="60" y1="30" x2="30" y2="90" stroke="url(#grad1)" strokeWidth="0.9" strokeLinecap="round" />
        <line className="morph-line" x1="60" y1="30" x2="90" y2="90" stroke="url(#grad1)" strokeWidth="0.9" strokeLinecap="round" />

        {/* nodes that move outward */}
        <circle className="morph-node n1" cx="60" cy="30" r="2.6" fill="url(#grad1)" />
        <circle className="morph-node n2" cx="60" cy="30" r="2.6" fill="url(#grad1)" />
        <circle className="morph-node n3" cx="60" cy="30" r="2.6" fill="url(#grad1)" />
      </svg>
    </div>
  );
}
