"use client";
import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Icon3DCart, Icon3DBox, Icon3DWarehouse } from "./Icon3D";

export type IconType = "cart" | "box" | "warehouse";

interface ProfileCard3DProps {
  selected: boolean;
  onClick: () => void;
  iconType: IconType;
  title: string;
}

export function ProfileCard3D({ selected, onClick, iconType, title }: ProfileCard3DProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovering, setHovering] = useState(false);
  const [flash, setFlash] = useState(false);

  // Drag-to-rotate state
  const [dragRot, setDragRot] = useState({ rx: 0, ry: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragBase = useRef({ rx: 0, ry: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setDragRot({
        rx: dragBase.current.rx - dy * 1.2,
        ry: dragBase.current.ry + dx * 1.2,
      });
      return;
    }
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (e.clientX - cx) / (rect.width / 2);
    const y = (e.clientY - cy) / (rect.height / 2);
    setTilt({ rx: -y * 12, ry: x * 12 });
  }, []);

  const handleMouseEnter = useCallback(() => setHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setHovering(false);
    setTilt({ rx: 0, ry: 0 });
    dragging.current = false;
  }, []);

  const handleIconMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    dragBase.current = { ...dragRot };
  }, [dragRot]);

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const handleClick = useCallback(() => {
    setFlash(true);
    setTimeout(() => setFlash(false), 400);
    onClick();
  }, [onClick]);

  // Combined icon rotation: card tilt + drag rotation
  const iconTilt = {
    rx: tilt.rx + dragRot.rx,
    ry: tilt.ry + dragRot.ry,
  };

  return (
    <button
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      className={cn(
        "relative flex flex-col items-center gap-4 p-8 rounded-xl border text-center",
        "transition-[box-shadow,border-color] duration-200 ease-out cursor-pointer",
        "backdrop-blur-md bg-slate-900/70",
        "active:scale-[0.97]",
        hovering && !selected && "border-[hsla(182,96%,33%,0.4)] shadow-[0_0_20px_hsla(182,96%,33%,0.15)]",
        selected
          ? "border-[hsla(182,96%,33%,0.7)] card-3d-glow"
          : "border-slate-700/60",
        flash && "selection-pulse-active"
      )}
      style={{
        transform: hovering
          ? `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.02)`
          : "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: hovering
          ? "transform 0.1s ease-out"
          : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Draggable 3D icon */}
      <div
        onMouseDown={handleIconMouseDown}
        className="cursor-grab active:cursor-grabbing transition-transform duration-150 ease-out"
        style={{
          transform: hovering
            ? `translate3d(${-tilt.ry * 0.8}px, ${tilt.rx * 0.8}px, 24px)`
            : "translate3d(0, 0, 0)",
          transformStyle: "preserve-3d",
        }}
      >
        {iconType === "cart" && <Icon3DCart tilt={iconTilt} />}
        {iconType === "box" && <Icon3DBox tilt={iconTilt} />}
        {iconType === "warehouse" && <Icon3DWarehouse tilt={iconTilt} />}
      </div>
      <span className="text-sm font-medium text-slate-200 leading-snug">{title}</span>

      {/* Selection indicator */}
      {selected && (
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[hsl(182,96%,33%)] flex items-center justify-center animate-scale-in">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </button>
  );
}
