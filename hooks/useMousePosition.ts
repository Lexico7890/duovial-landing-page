"use client";

import { useState, useEffect, useCallback, RefObject } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition(ref?: RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
  });

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (ref?.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setPosition({
          x,
          y,
          normalizedX: x / rect.width,
          normalizedY: y / rect.height,
        });
      } else {
        setPosition({
          x: event.clientX,
          y: event.clientY,
          normalizedX: event.clientX / window.innerWidth,
          normalizedY: event.clientY / window.innerHeight,
        });
      }
    },
    [ref]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition((prev) => ({
      ...prev,
      normalizedX: 0.5,
      normalizedY: 0.5,
    }));
  }, []);

  useEffect(() => {
    const element = ref?.current ?? window;
    const currentRef = ref?.current;

    element.addEventListener("mousemove", handleMouseMove as EventListener);
    if (currentRef) {
      currentRef.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      element.removeEventListener("mousemove", handleMouseMove as EventListener);
      if (currentRef) {
        currentRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [ref, handleMouseMove, handleMouseLeave]);

  return position;
}
