"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function FatigueSimulator() {
  const [fatigueLevel, setFatigueLevel] = useState(0);

  const { eyeOpenness, faceColor, status, statusColor } = useMemo(() => {
    if (fatigueLevel < 33) {
      return {
        eyeOpenness: 1,
        faceColor: "#00E676",
        status: "ALERTA",
        statusColor: "text-guardian",
      };
    }
    if (fatigueLevel < 66) {
      return {
        eyeOpenness: 0.5,
        faceColor: "#FFB300",
        status: "CANSADO",
        statusColor: "text-amber",
      };
    }
    return {
      eyeOpenness: 0.1,
      faceColor: "#FF1744",
      status: "ALERTA DE FATIGA",
      statusColor: "text-panic",
    };
  }, [fatigueLevel]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <svg
          width="180"
          height="180"
          viewBox="0 0 200 200"
          className="drop-shadow-[0_0_30px_rgba(0,230,118,0.3)]"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke={faceColor}
            strokeWidth="3"
            opacity="0.5"
          />
          <circle cx="100" cy="100" r="70" fill="rgba(13,27,42,0.8)" />

          {/* Eyes */}
          <motion.ellipse
            cx="70"
            cy="85"
            rx="12"
            ry={12 * eyeOpenness}
            fill={faceColor}
            animate={{ ry: 12 * eyeOpenness }}
            transition={{ duration: 0.3 }}
          />
          <motion.ellipse
            cx="130"
            cy="85"
            rx="12"
            ry={12 * eyeOpenness}
            fill={faceColor}
            animate={{ ry: 12 * eyeOpenness }}
            transition={{ duration: 0.3 }}
          />

          {/* Mouth */}
          <motion.path
            d={
              fatigueLevel < 33
                ? "M 75 125 Q 100 140 125 125"
                : fatigueLevel < 66
                ? "M 80 130 L 120 130"
                : "M 85 135 Q 100 120 115 135"
            }
            stroke={faceColor}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            animate={{ d: fatigueLevel < 33 ? "M 75 125 Q 100 140 125 125" : fatigueLevel < 66 ? "M 80 130 L 120 130" : "M 85 135 Q 100 120 115 135" }}
          />

          {/* Scan lines */}
          {fatigueLevel > 50 && (
            <>
              <line x1="40" y1="60" x2="160" y2="60" stroke={faceColor} strokeWidth="1" opacity="0.3">
                <animate attributeName="y1" values="60;140;60" dur="2s" repeatCount="indefinite" />
                <animate attributeName="y2" values="60;140;60" dur="2s" repeatCount="indefinite" />
              </line>
            </>
          )}
        </svg>

        {fatigueLevel >= 66 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-panic text-lg font-bold text-white"
          >
            !
          </motion.div>
        )}
      </div>

      <div className="w-full max-w-xs space-y-3">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-guardian">Alerta</span>
          <span className={statusColor}>{status}</span>
          <span className="text-panic">Crítico</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={fatigueLevel}
          onChange={(e) => setFatigueLevel(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-guardian"
        />
        <p className="text-center text-sm text-white/50">
          Arrastra para simular niveles de fatiga
        </p>
      </div>
    </div>
  );
}
