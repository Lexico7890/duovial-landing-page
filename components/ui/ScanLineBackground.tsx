"use client";

import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";

export function ScanLineBackground({
  duration = 2500,
  pauseDuration = 1500,
}: {
  duration?: number;
  pauseDuration?: number;
}) {
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const totalCycle = duration + pauseDuration;
    const elapsed = time % totalCycle;
    const p = elapsed < duration ? elapsed / duration : 1;
    progress.set(p);
  });

  const top = useTransform(progress, (p) => `${p * 100}vh`);
  const opacity = useTransform(progress, (p) => (p >= 1 ? 0 : 0.4));

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 right-0 z-0"
        style={{
          top,
          opacity,
          height: "1px",
          background: "linear-gradient(90deg, transparent 5%, #00E676 30%, #00E5FF 50%, #00E676 70%, transparent 95%)",
          boxShadow: "0 0 8px 1px rgba(0,230,118,0.3), 0 0 20px 2px rgba(0,229,255,0.1)",
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 right-0 z-0"
        style={{
          top: useTransform(progress, (p) => `${p * 100 - 5}vh`),
          opacity: useTransform(opacity, (o) => o * 0.3),
          height: "10px",
          background: "linear-gradient(180deg, transparent, rgba(0,230,118,0.06), rgba(0,229,255,0.03), transparent)",
        }}
      />
    </>
  );
}
