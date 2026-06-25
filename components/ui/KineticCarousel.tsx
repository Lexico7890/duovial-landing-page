"use client";

import { useState, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface KineticCarouselProps {
  children: ReactNode[];
  className?: string;
}

export default function KineticCarousel({
  children,
  className = "",
}: KineticCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const rotateY = useTransform(springX, [-300, 300], [8, -8]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const threshold = 80;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -500) {
      setCurrentIndex((prev) => Math.min(prev + 1, children.length - 1));
    } else if (offset > threshold || velocity > 500) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
    x.set(0);
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="flex cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x: springX, rotateY }}
        animate={{ translateX: `-${currentIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0 px-4">
            {child}
          </div>
        ))}
      </motion.div>

      <div className="mt-6 flex justify-center gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-8 bg-guardian"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
