"use client";
interface Icon3DProps {
  tilt: { rx: number; ry: number };
}

const TEAL = "hsl(182, 96%, 33%)";
const TEAL_LIGHT = "hsl(182, 80%, 45%)";
const TEAL_DARK = "hsl(182, 90%, 22%)";
const TEAL_DARKER = "hsl(182, 85%, 16%)";

export function Icon3DCart({ tilt }: Icon3DProps) {
  return (
    <div
      className="relative w-16 h-16 animate-icon-float"
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.rx * 0.15}deg) rotateY(${tilt.ry * 0.15}deg)`,
      }}
    >
      {/* Cart body — top face */}
      <div
        className="absolute rounded-sm"
        style={{
          width: 36,
          height: 28,
          left: 10,
          top: 8,
          background: `linear-gradient(135deg, ${TEAL_LIGHT}, ${TEAL})`,
          transform: "rotateX(55deg) translateZ(8px)",
          transformStyle: "preserve-3d",
          boxShadow: `0 2px 12px ${TEAL_DARK}88`,
        }}
      />
      {/* Cart body — front face */}
      <div
        className="absolute rounded-sm"
        style={{
          width: 36,
          height: 14,
          left: 10,
          top: 24,
          background: `linear-gradient(180deg, ${TEAL}, ${TEAL_DARK})`,
          transform: "translateZ(4px)",
        }}
      />
      {/* Cart body — side face */}
      <div
        className="absolute rounded-sm"
        style={{
          width: 8,
          height: 14,
          left: 42,
          top: 22,
          background: TEAL_DARK,
          transform: "rotateY(60deg) translateZ(2px)",
        }}
      />
      {/* Handle */}
      <div
        className="absolute"
        style={{
          width: 12,
          height: 3,
          left: 38,
          top: 12,
          background: TEAL_LIGHT,
          borderRadius: 2,
          transform: "rotateZ(-35deg) translateZ(6px)",
        }}
      />
      {/* Wheel left */}
      <div
        className="absolute rounded-full"
        style={{
          width: 8,
          height: 8,
          left: 16,
          top: 42,
          background: `radial-gradient(circle at 35% 35%, ${TEAL_LIGHT}, ${TEAL_DARKER})`,
          boxShadow: `0 3px 6px hsla(182, 90%, 15%, 0.5)`,
          transform: "translateZ(3px)",
        }}
      />
      {/* Wheel right */}
      <div
        className="absolute rounded-full"
        style={{
          width: 8,
          height: 8,
          left: 34,
          top: 42,
          background: `radial-gradient(circle at 35% 35%, ${TEAL_LIGHT}, ${TEAL_DARKER})`,
          boxShadow: `0 3px 6px hsla(182, 90%, 15%, 0.5)`,
          transform: "translateZ(3px)",
        }}
      />
      {/* Ground shadow */}
      <div
        className="absolute rounded-full"
        style={{
          width: 40,
          height: 8,
          left: 8,
          top: 50,
          background: "radial-gradient(ellipse, hsla(182,90%,15%,0.3), transparent 70%)",
          transform: `translate(${tilt.ry * 0.3}px, ${-tilt.rx * 0.15}px)`,
        }}
      />
    </div>
  );
}

export function Icon3DBox({ tilt }: Icon3DProps) {
  return (
    <div
      className="relative w-16 h-16 animate-icon-float"
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.rx * 0.15}deg) rotateY(${tilt.ry * 0.15}deg)`,
      }}
    >
      {/* Top face */}
      <div
        className="absolute"
        style={{
          width: 32,
          height: 20,
          left: 16,
          top: 4,
          background: `linear-gradient(135deg, ${TEAL_LIGHT}, ${TEAL})`,
          transform: "rotateX(50deg) translateZ(14px) skewX(-8deg)",
          transformStyle: "preserve-3d",
        }}
      />
      {/* Top tape line */}
      <div
        className="absolute"
        style={{
          width: 4,
          height: 18,
          left: 30,
          top: 5,
          background: "hsla(182, 60%, 60%, 0.6)",
          transform: "rotateX(50deg) translateZ(15px) skewX(-8deg)",
          borderRadius: 1,
        }}
      />
      {/* Left face */}
      <div
        className="absolute"
        style={{
          width: 28,
          height: 28,
          left: 4,
          top: 16,
          background: `linear-gradient(180deg, ${TEAL}, ${TEAL_DARK})`,
          transform: "rotateY(-25deg) skewY(12deg) translateZ(2px)",
          borderRadius: 2,
        }}
      />
      {/* Right face */}
      <div
        className="absolute"
        style={{
          width: 28,
          height: 28,
          left: 30,
          top: 12,
          background: `linear-gradient(180deg, ${TEAL_DARK}, ${TEAL_DARKER})`,
          transform: "rotateY(25deg) skewY(-12deg) translateZ(2px)",
          borderRadius: 2,
        }}
      />
      {/* Front tape line */}
      <div
        className="absolute"
        style={{
          width: 3,
          height: 26,
          left: 17,
          top: 18,
          background: "hsla(182, 60%, 55%, 0.4)",
          transform: "rotateY(-25deg) skewY(12deg) translateZ(3px)",
          borderRadius: 1,
        }}
      />
      {/* Ground shadow */}
      <div
        className="absolute rounded-full"
        style={{
          width: 44,
          height: 10,
          left: 8,
          top: 50,
          background: "radial-gradient(ellipse, hsla(182,90%,15%,0.3), transparent 70%)",
          transform: `translate(${tilt.ry * 0.3}px, ${-tilt.rx * 0.15}px)`,
        }}
      />
    </div>
  );
}

export function Icon3DWarehouse({ tilt }: Icon3DProps) {
  return (
    <div
      className="relative w-16 h-16 animate-icon-float"
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.rx * 0.15}deg) rotateY(${tilt.ry * 0.15}deg)`,
      }}
    >
      {/* Roof */}
      <div
        className="absolute"
        style={{
          width: 0,
          height: 0,
          left: 8,
          top: 2,
          borderLeft: "24px solid transparent",
          borderRight: "24px solid transparent",
          borderBottom: `16px solid ${TEAL_LIGHT}`,
          transform: "translateZ(6px)",
          filter: "drop-shadow(0 -2px 4px hsla(182,90%,15%,0.3))",
        }}
      />
      {/* Front wall */}
      <div
        className="absolute"
        style={{
          width: 42,
          height: 28,
          left: 9,
          top: 18,
          background: `linear-gradient(180deg, ${TEAL}, ${TEAL_DARK})`,
          transform: "translateZ(4px)",
          borderRadius: "2px 2px 0 0",
        }}
      />
      {/* Side wall */}
      <div
        className="absolute"
        style={{
          width: 12,
          height: 28,
          left: 47,
          top: 16,
          background: TEAL_DARKER,
          transform: "rotateY(50deg) translateZ(2px) skewY(-6deg)",
          borderRadius: "0 2px 0 0",
        }}
      />
      {/* Door */}
      <div
        className="absolute"
        style={{
          width: 14,
          height: 16,
          left: 23,
          top: 30,
          background: `linear-gradient(180deg, ${TEAL_DARKER}, hsl(182, 85%, 12%))`,
          borderRadius: "3px 3px 0 0",
          transform: "translateZ(5px)",
        }}
      />
      {/* Window left */}
      <div
        className="absolute"
        style={{
          width: 8,
          height: 6,
          left: 13,
          top: 24,
          background: "hsla(182, 60%, 55%, 0.5)",
          borderRadius: 1,
          transform: "translateZ(5px)",
          boxShadow: "inset 0 0 3px hsla(182,80%,70%,0.3)",
        }}
      />
      {/* Window right */}
      <div
        className="absolute"
        style={{
          width: 8,
          height: 6,
          left: 39,
          top: 24,
          background: "hsla(182, 60%, 55%, 0.5)",
          borderRadius: 1,
          transform: "translateZ(5px)",
          boxShadow: "inset 0 0 3px hsla(182,80%,70%,0.3)",
        }}
      />
      {/* Ground shadow */}
      <div
        className="absolute rounded-full"
        style={{
          width: 48,
          height: 10,
          left: 6,
          top: 50,
          background: "radial-gradient(ellipse, hsla(182,90%,15%,0.3), transparent 70%)",
          transform: `translate(${tilt.ry * 0.3}px, ${-tilt.rx * 0.15}px)`,
        }}
      />
    </div>
  );
}
