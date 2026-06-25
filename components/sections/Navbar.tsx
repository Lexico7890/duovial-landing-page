"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

const navLinks = [
  { label: "Problema", href: "#problema" },
  { label: "Solución", href: "#solucion" },
  { label: "Demo", href: "#demo" },
  { label: "Specs", href: "#specs" },
  { label: "Planes", href: "#planes" },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { threshold: 0.4, rootMargin: "-80px 0px -40% 0px" }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [ids]);

  return active;
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(13, 27, 42, 0)", "rgba(13, 27, 42, 0.85)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);
  const activeSection = useActiveSection(navLinks.map((l) => l.href.replace("#", "")));

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ backgroundColor }}
    >
      <motion.div
        className="absolute inset-0 border-b border-white/[var(--border-opacity)]"
        style={{ "--border-opacity": borderOpacity } as React.CSSProperties}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ backdropFilter: backdropBlur }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Duo<span className="text-guardian">Vial</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={activeSection === link.href.replace("#", "")}
            />
          ))}
        </div>

        <MagneticButton
          href="#descarga"
          className="relative z-10 overflow-hidden rounded-full border border-guardian/50 bg-guardian/10 px-5 py-2 text-sm font-semibold text-guardian transition-colors hover:bg-guardian/20"
        >
          <span className="relative z-10">Descargar ahora</span>
          <div className="absolute inset-0 -z-10 animate-pulse bg-guardian/10" />
        </MagneticButton>
      </div>
    </motion.nav>
  );
}

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
    >
      {isHovered && (
        <div
          className="absolute inset-0 rounded-full opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(80px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,230,118,0.15), transparent 50%)`,
          }}
        />
      )}
      <span className="relative z-10">{label}</span>
      {isActive && (
        <motion.div
          layoutId="navIndicator"
          className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-guardian"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </a>
  );
}
