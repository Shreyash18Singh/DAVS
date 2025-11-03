"use client";
export default function OmAnimation() {
  return (
    <svg className="om-svg om-morph" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#ffd54a" />
          <stop offset="100%" stopColor="#ffb300" />
        </linearGradient>
        <radialGradient id="peachGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd1a9" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffb085" stopOpacity="0.06" />
        </radialGradient>
      </defs>

      {/* Background halo */}
      <circle cx="150" cy="150" r="120" fill="url(#goldGrad)" opacity="0.06" />

      {/* subtle mandala rings */}
      <g opacity="0.06" transform="translate(0,0)">
        <circle cx="150" cy="150" r="90" fill="none" stroke="#ffd54a" strokeWidth="1" />
        <circle cx="150" cy="150" r="110" fill="none" stroke="#ffb300" strokeWidth="0.6" />
      </g>

      {/* Om symbol (stylized path) */}
      <g transform="translate(35,20) scale(0.85)">
        <path d="M120 40c-18-6-40 8-44 28-4 18 6 34 24 36 10 1 18-2 26-6 2 12-7 22-20 26-26 8-58-6-70-32-12-26 2-56 30-64 24-7 46 4 54 12z" fill="#fff" opacity="0.85" />
      </g>

      {/* Neural network nodes */}
      <g>
        <line className="neural-line" x1="70" y1="220" x2="120" y2="170" />
        <line className="neural-line" x1="120" y1="170" x2="200" y2="160" />
        <line className="neural-line" x1="80" y1="200" x2="170" y2="140" />
        <circle className="neural-node pulse" cx="70" cy="220" r="5" fill="url(#goldGrad)" />
        <circle className="neural-node pulse" cx="120" cy="170" r="6" fill="url(#peachGlow)" />
        <circle className="neural-node pulse" cx="200" cy="160" r="7" fill="url(#goldGrad)" />
      </g>

    </svg>
  );
}
