"use client";

import { useSyncExternalStore } from "react";

interface RadarBackgroundProps {
  waveCount?: number;
  color?: string;
  duration?: number;
}

export default function RadarBackground({
  waveCount = 4,
  color = "#00E676",
  duration = 3.5,
}: RadarBackgroundProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
      <div className="relative flex items-center justify-center">
        {/* Central glow matching the logo inner circle */}
        <div
          className="absolute h-[120px] w-[120px] rounded-full opacity-20 blur-xl"
          style={{ backgroundColor: color }}
        />

        {/* Expanding radar rings */}
        {Array.from({ length: waveCount }).map((_, index) => {
          const delay = (duration / waveCount) * index;
          const size = 120 + index * 180;

          return (
            <div
              key={index}
              className="radar-ring absolute rounded-full border"
              style={{
                width: size,
                height: size,
                borderColor: color,
                boxShadow: `0 0 24px ${color}30`,
                animation: `radar-ping ${duration}s ease-out ${delay}s infinite`,
              }}
            />
          );
        })}

        {/* Subtle sweep line rotating from center */}
        <div
          className="radar-sweep absolute h-[400px] w-[400px] rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${color}12 30deg, transparent 60deg)`,
            animation: "radar-sweep 4s linear infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes radar-ping {
          0% {
            opacity: 0;
            transform: translateZ(0) scale(0.8);
          }
          15% {
            opacity: 0.35;
          }
          100% {
            opacity: 0;
            transform: translateZ(0) scale(1.8);
          }
        }

        @keyframes radar-sweep {
          from {
            transform: translateZ(0) rotate(0deg);
          }
          to {
            transform: translateZ(0) rotate(360deg);
          }
        }

        .radar-ring,
        .radar-sweep {
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .radar-ring,
          .radar-sweep {
            animation: none !important;
            opacity: 0.15 !important;
          }
        }

        @media (max-width: 768px) {
          .radar-ring {
            opacity: 0.6 !important;
          }
        }
      `}</style>
    </div>
  );
}
