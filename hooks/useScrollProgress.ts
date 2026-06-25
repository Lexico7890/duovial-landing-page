"use client";

import { useSyncExternalStore } from "react";

function getScrollProgress() {
  if (typeof window === "undefined") return 0;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;
  return Math.min(Math.max(progress, 0), 1);
}

function subscribe(callback: () => void) {
  const handleScroll = () => {
    callback();
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}

export function useScrollProgress() {
  return useSyncExternalStore(
    subscribe,
    getScrollProgress,
    () => 0
  );
}
