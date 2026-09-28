import React from 'react';
import { CONSTELLATIONS } from '../data/celestial';

interface ConstellationDisplayProps {
  name: string;
  className?: string;
  size?: number;
  highlightColor?: string;
  interactive?: boolean;
  showStarNames?: boolean;
}

export const ConstellationDisplay: React.FC<ConstellationDisplayProps> = ({
  name,
  className = '',
  size = 280,
  highlightColor = '#D6B27C',
  showStarNames = false
}) => {
  const info = CONSTELLATIONS[name] || CONSTELLATIONS['Orion'];

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background glow halo */}
      <div
        className="absolute inset-0 rounded-full blur-2xl pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle, ${highlightColor}20 0%, transparent 70%)`
        }}
      />

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible transition-all duration-700"
      >
        <defs>
          <radialGradient id={`star-glow-${name}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="40%" stopColor={highlightColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={highlightColor} stopOpacity="0" />
          </radialGradient>
          <filter id={`celestial-glow-${name}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Constellation connective lines */}
        {info.connections.map(([startIdx, endIdx], i) => {
          const p1 = info.stars[startIdx];
          const p2 = info.stars[endIdx];
          if (!p1 || !p2) return null;
          return (
            <line
              key={`conn-${i}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="rgba(203, 213, 225, 0.3)"
              strokeWidth="0.8"
              strokeDasharray="2 1.5"
              className="transition-all duration-1000"
            />
          );
        })}

        {/* Stars */}
        {info.stars.map((star, i) => (
          <g key={`star-${i}`} filter={`url(#celestial-glow-${name})`}>
            {/* Outer halo */}
            <circle
              cx={star.x}
              cy={star.y}
              r={star.size * 1.8}
              fill={`url(#star-glow-${name})`}
              opacity={0.6}
            />
            {/* Core star */}
            <circle
              cx={star.x}
              cy={star.y}
              r={star.size * 0.75}
              fill="#FFFFFF"
            />
            {/* Star sparkle spikes for prominent stars */}
            {star.size > 2.5 && (
              <path
                d={`M ${star.x} ${star.y - star.size * 2} L ${star.x} ${star.y + star.size * 2} M ${star.x - star.size * 2} ${star.y} L ${star.x + star.size * 2} ${star.y}`}
                stroke="#FFFFFF"
                strokeWidth="0.4"
                opacity="0.8"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
