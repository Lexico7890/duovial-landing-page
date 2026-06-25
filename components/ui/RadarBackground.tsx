"use client";

import { motion } from "framer-motion";

interface RadarBackgroundProps {
  waveCount?: number;
  color?: string;
  duration?: number;
}

export default function RadarBackground({
  waveCount = 4,
  color = "#00E676",
  duration = 3,
}: RadarBackgroundProps) {
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
            <motion.div
              key={index}
              className="absolute rounded-full border"
              style={{
                width: size,
                height: size,
                borderColor: color,
                boxShadow: `0 0 20px ${color}20, inset 0 0 20px ${color}10`,
              }}
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0.8, 1.8],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          );
        })}

        {/* Subtle sweep line rotating from center */}
        <motion.div
          className="absolute h-[400px] w-[400px] rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${color}15 30deg, transparent 60deg)`,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}
