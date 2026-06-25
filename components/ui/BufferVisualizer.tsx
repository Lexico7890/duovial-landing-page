"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BufferVisualizer() {
  const [segments, setSegments] = useState([
    { id: 0, progress: 0, saved: false },
    { id: 1, progress: 0, saved: false },
  ]);
  const [isRecording, setIsRecording] = useState(true);

  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setSegments((prev) =>
        prev.map((seg) => ({
          ...seg,
          progress: seg.saved ? seg.progress : (seg.progress + 2) % 100,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording]);

  const triggerEvent = () => {
    setIsRecording(false);
    setSegments((prev) =>
      prev.map((seg) => ({ ...seg, saved: true, progress: 100 }))
    );

    setTimeout(() => {
      setSegments([
        { id: Date.now(), progress: 0, saved: false },
        { id: Date.now() + 1, progress: 0, saved: false },
      ]);
      setIsRecording(true);
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-4">
        {segments.map((seg) => (
          <div
            key={seg.id}
            className={`relative h-32 w-32 overflow-hidden rounded-2xl border-2 transition-colors duration-300 ${
              seg.saved
                ? "border-guardian bg-guardian/10"
                : "border-white/20 bg-white/5"
            }`}
          >
            <motion.div
              className={`absolute bottom-0 left-0 right-0 ${
                seg.saved ? "bg-guardian/40" : "bg-guardian/20"
              }`}
              initial={{ height: "0%" }}
              animate={{ height: `${seg.progress}%` }}
              transition={{ duration: 0.1 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {seg.saved ? "15s" : `${Math.floor(seg.progress / 100 * 15)}s`}
              </span>
            </div>
            {seg.saved && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 text-guardian"
              >
                ✓
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {segments.some((s) => s.saved) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-full border border-guardian/30 bg-guardian/10 px-4 py-2 text-sm text-guardian"
          >
            Incidente guardado: 15s antes + 15s después
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={triggerEvent}
        disabled={!isRecording}
        className="rounded-full border border-panic/50 bg-panic/10 px-6 py-2.5 text-sm font-semibold text-panic transition-colors hover:bg-panic/20 disabled:opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Simular evento
      </motion.button>
    </div>
  );
}
