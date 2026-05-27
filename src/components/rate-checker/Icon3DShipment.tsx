"use client";
interface Icon3DProps {
  tilt: { rx: number; ry: number };
}

const PRIMARY = "hsl(200, 98%, 39%)";
const PRIMARY_LIGHT = "hsl(200, 85%, 55%)";
const PRIMARY_DARK = "hsl(200, 90%, 28%)";
const PRIMARY_DARKER = "hsl(200, 85%, 18%)";

export function Icon3DDomesticBox({ tilt }: Icon3DProps) {
  return (
    <div
      className="animate-icon-float"
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.rx * 0.12}deg) rotateY(${tilt.ry * 0.12}deg)`,
      }}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="box-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY} />
          </linearGradient>
          <linearGradient id="box-left" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PRIMARY} />
            <stop offset="100%" stopColor={PRIMARY_DARK} />
          </linearGradient>
          <linearGradient id="box-right" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_DARKER} />
          </linearGradient>
          <filter id="box-shadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={PRIMARY_DARKER} floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Isometric box */}
        <g filter="url(#box-shadow)">
          {/* Top face */}
          <polygon points="28,8 46,18 28,28 10,18" fill="url(#box-top)" />
          {/* Left face */}
          <polygon points="10,18 28,28 28,46 10,36" fill="url(#box-left)" />
          {/* Right face */}
          <polygon points="46,18 28,28 28,46 46,36" fill="url(#box-right)" />
        </g>

        {/* Tape line — top */}
        <line x1="28" y1="8" x2="28" y2="28" stroke={PRIMARY_LIGHT} strokeWidth="1.5" strokeOpacity="0.5" />
        {/* Tape line — front left */}
        <line x1="28" y1="28" x2="28" y2="46" stroke={PRIMARY_LIGHT} strokeWidth="1.5" strokeOpacity="0.35" />

        {/* UK flag accent — two small stripes on left face */}
        <rect x="14" y="24" width="8" height="2.5" rx="0.5" fill="hsl(0, 70%, 55%)" transform="skewY(26.57)" opacity="0.85" />
        <rect x="14" y="28" width="8" height="2.5" rx="0.5" fill="hsl(220, 60%, 50%)" transform="skewY(26.57)" opacity="0.85" />

        {/* Ground shadow ellipse */}
        <ellipse cx="28" cy="50" rx="16" ry="3" fill={PRIMARY_DARKER} fillOpacity="0.15" />
      </svg>
    </div>
  );
}

export function Icon3DExportGlobe({ tilt }: Icon3DProps) {
  return (
    <div
      className="animate-icon-float"
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.rx * 0.12}deg) rotateY(${tilt.ry * 0.12}deg)`,
      }}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="globe-grad-export" cx="0.38" cy="0.32" r="0.55">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="55%" stopColor={PRIMARY} />
            <stop offset="100%" stopColor={PRIMARY_DARK} />
          </radialGradient>
          <filter id="globe-shadow-export" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={PRIMARY_DARKER} floodOpacity="0.3" />
          </filter>
        </defs>

        <g filter="url(#globe-shadow-export)">
          {/* Globe sphere */}
          <circle cx="26" cy="26" r="17" fill="url(#globe-grad-export)" />

          {/* Latitude lines */}
          <ellipse cx="26" cy="18" rx="14" ry="3" fill="none" stroke={PRIMARY_LIGHT} strokeWidth="0.7" strokeOpacity="0.4" />
          <ellipse cx="26" cy="26" rx="17" ry="4" fill="none" stroke={PRIMARY_LIGHT} strokeWidth="0.7" strokeOpacity="0.35" />
          <ellipse cx="26" cy="34" rx="14" ry="3" fill="none" stroke={PRIMARY_LIGHT} strokeWidth="0.7" strokeOpacity="0.3" />

          {/* Meridian */}
          <ellipse cx="26" cy="26" rx="8" ry="17" fill="none" stroke={PRIMARY_LIGHT} strokeWidth="0.7" strokeOpacity="0.35" />

          {/* Highlight */}
          <circle cx="20" cy="19" r="5" fill="white" fillOpacity="0.12" />
        </g>

        {/* Export arrow — up-right */}
        <g>
          <line x1="32" y1="32" x2="44" y2="14" stroke="hsl(200, 95%, 60%)" strokeWidth="2.5" strokeLinecap="round" />
          <polyline points="39,13 44,14 43,19" stroke="hsl(200, 95%, 60%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* Ground shadow */}
        <ellipse cx="28" cy="50" rx="14" ry="2.5" fill={PRIMARY_DARKER} fillOpacity="0.15" />
      </svg>
    </div>
  );
}

export function Icon3DImportGlobe({ tilt }: Icon3DProps) {
  return (
    <div
      className="animate-icon-float"
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.rx * 0.12}deg) rotateY(${tilt.ry * 0.12}deg)`,
      }}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="globe-grad-import" cx="0.38" cy="0.32" r="0.55">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="55%" stopColor={PRIMARY} />
            <stop offset="100%" stopColor={PRIMARY_DARK} />
          </radialGradient>
          <filter id="globe-shadow-import" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={PRIMARY_DARKER} floodOpacity="0.3" />
          </filter>
        </defs>

        <g filter="url(#globe-shadow-import)">
          {/* Globe sphere */}
          <circle cx="26" cy="26" r="17" fill="url(#globe-grad-import)" />

          {/* Latitude lines */}
          <ellipse cx="26" cy="18" rx="14" ry="3" fill="none" stroke={PRIMARY_LIGHT} strokeWidth="0.7" strokeOpacity="0.4" />
          <ellipse cx="26" cy="26" rx="17" ry="4" fill="none" stroke={PRIMARY_LIGHT} strokeWidth="0.7" strokeOpacity="0.35" />
          <ellipse cx="26" cy="34" rx="14" ry="3" fill="none" stroke={PRIMARY_LIGHT} strokeWidth="0.7" strokeOpacity="0.3" />

          {/* Meridian */}
          <ellipse cx="26" cy="26" rx="8" ry="17" fill="none" stroke={PRIMARY_LIGHT} strokeWidth="0.7" strokeOpacity="0.35" />

          {/* Highlight */}
          <circle cx="20" cy="19" r="5" fill="white" fillOpacity="0.12" />
        </g>

        {/* Import arrow — down into globe */}
        <g>
          <line x1="44" y1="14" x2="34" y2="30" stroke="hsl(145, 65%, 45%)" strokeWidth="2.5" strokeLinecap="round" />
          <polyline points="38,30 34,30 35,25" stroke="hsl(145, 65%, 45%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* Ground shadow */}
        <ellipse cx="28" cy="50" rx="14" ry="2.5" fill={PRIMARY_DARKER} fillOpacity="0.15" />
      </svg>
    </div>
  );
}
