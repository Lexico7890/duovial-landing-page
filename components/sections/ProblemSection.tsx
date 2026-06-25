"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import TiltCard from "@/components/ui/TiltCard";
import SpotlightCard from "@/components/ui/SpotlightCard";

const problems = [
  {
    title: "Sin evidencia",
    stat: "50/50",
    description: "Sin video, un accidente se convierte en palabra contra palabra. El seguro divide la culpa y tú pagas.",
    color: "#FF1744",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Batería muerta",
    stat: "21 GB",
    suffix: "/hora",
    description: "Las apps tradicionales graban todo. Tu teléfono se convierte en una estufa y la batería muere en 2 horas.",
    color: "#FFB300",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Fatiga letal",
    stat: "1/4",
    description: "De los accidentes graves en carretera están relacionados con la somnolencia al volante. No hay segunda oportunidad.",
    color: "#00E676",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const roadX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="problema"
      ref={containerRef}
      className="relative overflow-hidden px-6 py-32"
    >
      {/* Animated road background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute top-1/2 left-0 h-[2px] w-[200%] -translate-y-1/2"
          style={{ x: roadX }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>
        <div className="absolute top-1/2 left-1/2 h-32 w-1 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <AnimatedSection animation="fade-in-left">
            <div className="space-y-6">
              <span className="text-sm font-semibold uppercase tracking-widest text-panic">
                El problema
              </span>
              <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                La carretera no perdona. Y sin evidencia,{" "}
                <span className="text-panic">tampoco el seguro</span>.
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-right" delay={0.2}>
            <div className="rounded-2xl border-l-4 border-panic bg-white/5 p-8 backdrop-blur-sm">
              <blockquote className="text-lg italic text-white/70 md:text-xl">
                &ldquo;Me chocaron mientras conducía Uber. El otro conductor negó todo. Sin video, el seguro dijo 50/50. Yo perdí.&rdquo;
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-white/40">
                — Historia real que originó DuoVial
              </p>
            </div>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {problems.map((problem, index) => (
            <AnimatedSection
              key={problem.title}
              animation="fade-in-up"
              delay={0.1 * index}
            >
              <TiltCard className="h-full">
                <SpotlightCard
                  className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors duration-300 hover:border-white/20"
                  spotlightColor={`${problem.color}25`}
                >
                  <div
                    className="mb-6 inline-flex rounded-xl p-3"
                    style={{ backgroundColor: `${problem.color}15`, color: problem.color }}
                  >
                    {problem.icon}
                  </div>
                  <div className="mb-3 text-4xl font-bold" style={{ color: problem.color }}>
                    {problem.stat}
                    {problem.suffix && (
                      <span className="text-lg text-white/40">{problem.suffix}</span>
                    )}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{problem.title}</h3>
                  <p className="text-white/50 leading-relaxed">{problem.description}</p>
                </SpotlightCard>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
