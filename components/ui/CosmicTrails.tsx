"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

interface Comet {
  id: string;
  path: string;
  length: number;
  duration: number;
  delay: number;
  color: string;
  headColor: string;
  size: number;
  bornAt: number;
}

interface SpawnConfig {
  sectionId: string;
  spawned: boolean;
}

const SECTIONS = ["problema", "solucion", "fatiga", "dashboard", "planes", "testimonios"];
const MAX_TRAILS = 30;
const DESKTOP_COMETS_PER_SECTION = 5;
const MOBILE_COMETS_PER_SECTION = 2;

function generateComet(index: number, isMobile: boolean): Comet {
  const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
  const width = 100;
  const height = 100;

  let startX: number, startY: number, endX: number, endY: number;
  const margin = -10;

  // Start from one edge
  switch (side) {
    case 0: // top
      startX = Math.random() * width;
      startY = margin;
      endX = Math.random() * width;
      endY = height + 10;
      break;
    case 1: // right
      startX = width + 10;
      startY = Math.random() * height;
      endX = margin;
      endY = Math.random() * height;
      break;
    case 2: // bottom
      startX = Math.random() * width;
      startY = height + 10;
      endX = Math.random() * width;
      endY = margin;
      break;
    default: // left
      startX = margin;
      startY = Math.random() * height;
      endX = width + 10;
      endY = Math.random() * height;
      break;
  }

  // Control points for bezier curve
  const cp1X = startX + (endX - startX) * 0.3 + (Math.random() - 0.5) * 40;
  const cp1Y = startY + (endY - startY) * 0.3 + (Math.random() - 0.5) * 40;
  const cp2X = startX + (endX - startX) * 0.7 + (Math.random() - 0.5) * 40;
  const cp2Y = startY + (endY - startY) * 0.7 + (Math.random() - 0.5) * 40;

  const path = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

  return {
    id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
    path,
    length: 0,
    duration: isMobile ? 1.8 + Math.random() * 0.8 : 2.5 + Math.random() * 1.5,
    delay: Math.random() * 0.6,
    color: `url(#cometGradient${index % 3})`,
    headColor: index % 2 === 0 ? "#00E676" : "#00E5FF",
    size: isMobile ? 2 + Math.random() * 1 : 3 + Math.random() * 2,
    bornAt: Date.now(),
  };
}

export default function CosmicTrails() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [comets, setComets] = useState<Comet[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const spawnState = useRef<SpawnConfig[]>(
    SECTIONS.map((id) => ({ sectionId: id, spawned: false }))
  );
  const heroSpawned = useRef(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const spawnComets = useCallback(
    (count: number) => {
      setComets((prev) => {
        const newComets = Array.from({ length: count }, (_, i) => generateComet(prev.length + i, isMobile));
        const combined = [...prev, ...newComets];
        // Keep max trails, fade oldest
        if (combined.length > MAX_TRAILS) {
          return combined.slice(combined.length - MAX_TRAILS);
        }
        return combined;
      });
    },
    [isMobile]
  );

  // Hero initial spawn
  useEffect(() => {
    if (heroSpawned.current) return;
    heroSpawned.current = true;
    const timer = setTimeout(() => {
      spawnComets(isMobile ? MOBILE_COMETS_PER_SECTION : DESKTOP_COMETS_PER_SECTION);
    }, 500);
    return () => clearTimeout(timer);
  }, [isMobile, spawnComets]);

  // Section scroll observer
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const config = spawnState.current.find((s) => s.sectionId === sectionId);
            if (config && !config.spawned) {
              config.spawned = true;
              spawnComets(isMobile ? MOBILE_COMETS_PER_SECTION : DESKTOP_COMETS_PER_SECTION);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobile, spawnComets]);

  // Measure path lengths once comets are added
  useEffect(() => {
    if (!svgRef.current) return;

    comets.forEach((comet) => {
      if (comet.length > 0) return;
      const pathEl = svgRef.current?.querySelector(`#path-${comet.id}`) as SVGPathElement;
      if (pathEl) {
        const length = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = `${length}`;
        pathEl.style.strokeDashoffset = `${length}`;
        setComets((prev) =>
          prev.map((c) => (c.id === comet.id ? { ...c, length } : c))
        );
      }
    });
  }, [comets]);

  // Auto-cleanup very old comets to prevent memory growth on very long sessions
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setComets((prev) => prev.filter((c) => now - c.bornAt < 5 * 60 * 1000)); // 5 minutes
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const gradients = useMemo(
    () => (
      <defs>
        <linearGradient id="cometGradient0" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00E676" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#00E676" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="cometGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00E676" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="cometGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00E676" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.6" />
        </linearGradient>
        <filter id="cometGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    ),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070F18]">
      <svg
        ref={svgRef}
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {gradients}

        {comets.map((comet) => (
          <g key={comet.id}>
            {/* Trail line */}
            <path
              id={`path-${comet.id}`}
              d={comet.path}
              fill="none"
              stroke={comet.color}
              strokeWidth={isMobile ? 0.08 : 0.12}
              strokeLinecap="round"
              className="comet-trail"
              style={{
                strokeDasharray: comet.length || 1000,
                strokeDashoffset: comet.length || 1000,
                animation: `drawComet ${comet.duration}s ease-out ${comet.delay}s forwards`,
                opacity: 0.6,
              }}
            />

            {/* Moving head */}
            {comet.length > 0 && (
              <circle r={isMobile ? 0.15 : 0.25} fill={comet.headColor} filter={isMobile ? undefined : "url(#cometGlow)"}>
                <animateMotion
                  dur={`${comet.duration}s`}
                  begin={`${comet.delay}s`}
                  fill="freeze"
                  path={comet.path}
                />
              </circle>
            )}
          </g>
        ))}
      </svg>

      <style jsx>{`
        @keyframes drawComet {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
