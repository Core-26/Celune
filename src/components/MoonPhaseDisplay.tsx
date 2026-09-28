import React from 'react';

interface MoonPhaseDisplayProps {
  phaseName: string;
  size?: number;
  className?: string;
  showGlow?: boolean;
}

export const MoonPhaseDisplay: React.FC<MoonPhaseDisplayProps> = ({
  phaseName,
  size = 120,
  className = '',
  showGlow = true
}) => {
  // Determine illumination based on phase name
  const name = phaseName.toLowerCase();
  
  // Render clean SVG representing precise crescent or full moon geometry
  const renderMoonShape = () => {
    if (name.includes('new')) {
      return (
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="#0B1220"
          stroke="rgba(203, 213, 225, 0.25)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
      );
    }

    if (name.includes('full')) {
      return (
        <g>
          <circle cx="50" cy="50" r="45" fill="url(#full-moon-grad)" />
          {/* Subtle lunar maria textures */}
          <circle cx="42" cy="38" r="14" fill="rgba(15, 23, 42, 0.15)" />
          <circle cx="62" cy="56" r="18" fill="rgba(15, 23, 42, 0.12)" />
          <circle cx="36" cy="62" r="10" fill="rgba(15, 23, 42, 0.1)" />
        </g>
      );
    }

    if (name.includes('first quarter') || name.includes('third quarter')) {
      const isFirst = name.includes('first');
      return (
        <g>
          <circle cx="50" cy="50" r="45" fill="#0B1220" />
          <path
            d={isFirst ? "M 50 5 A 45 45 0 0 1 50 95 Z" : "M 50 5 A 45 45 0 0 0 50 95 Z"}
            fill="url(#full-moon-grad)"
          />
        </g>
      );
    }

    if (name.includes('crescent')) {
      const isWaxing = name.includes('waxing');
      return (
        <g>
          <circle cx="50" cy="50" r="45" fill="#0B1220" />
          {/* Crescent path */}
          <path
            d={
              isWaxing
                ? "M 50 5 A 45 45 0 0 1 50 95 A 32 45 0 0 0 50 5 Z"
                : "M 50 5 A 45 45 0 0 0 50 95 A 32 45 0 0 1 50 5 Z"
            }
            fill="url(#full-moon-grad)"
          />
        </g>
      );
    }

    // Default to Gibbous
    return (
      <g>
        <circle cx="50" cy="50" r="45" fill="#0B1220" />
        <path
          d="M 50 5 A 45 45 0 0 1 50 95 A 25 45 0 0 0 50 5 Z"
          fill="url(#full-moon-grad)"
        />
        <circle cx="50" cy="50" r="45" fill="url(#full-moon-grad)" opacity={0.65} />
      </g>
    );
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full blur-xl pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(226, 232, 240, 0.4) 0%, transparent 70%)'
          }}
        />
      )}
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="full-moon-grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </radialGradient>
        </defs>
        {renderMoonShape()}
      </svg>
    </div>
  );
};
