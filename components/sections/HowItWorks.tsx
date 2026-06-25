"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const steps = [
  {
    number: "01",
    title: "Modo Vigilante",
    subtitle: "Buffer circular en cache del OS",
    description: "La cámara trasera captura continuamente pero NO escribe a disco. Mantiene solo los últimos 30 segundos en memoria optimizada.",
    color: "#00E676",
    details: ["1080p @ 30fps", "H.264 @ 2 Mbps", "Audio desactivado", "Foreground Service"],
  },
  {
    number: "02",
    title: "Detección de eventos",
    subtitle: "Botón + Acelerómetro + GPS",
    description: "No confiamos en un solo sensor. Botón de pánico manual + acelerómetro configurable (1.5G–5.0G) + desaceleración GPS.",
    color: "#FFB300",
    details: ["Botón de pánico", "G-Force configurable", "Cooldown 12s", "Múltiples triggers"],
  },
  {
    number: "03",
    title: "Guardado inteligente",
    subtitle: "15s antes + 15s después",
    description: "Al detectar evento, guarda automáticamente el segmento previo y continúa grabando 15 segundos posteriores como evidencia.",
    color: "#00E5FF",
    details: ["2 archivos .mp4", "Downloads/DuoVial/", "Preview nativo", "Share/delete"],
  },
  {
    number: "04",
    title: "Anti-Somnolencia",
    subtitle: "ML Kit + Health Connect",
    description: "Cámara frontal solo en FatigueScreen analiza EAR en tiempo real. Wearables vía Health Connect para detección en background.",
    color: "#FF1744",
    details: ["ML Kit Face Detection", "Eye Aspect Ratio", "640×480 @ 10fps", "Health Connect"],
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      id="solucion"
      ref={containerRef}
      className="relative px-6 py-32"
    >
      <div className="mx-auto max-w-6xl">
        <AnimatedSection animation="fade-in-up" className="mb-20 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-guardian">
            Cómo funciona
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Cuatro capas de protección activa
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Diseñado para sobrevivir al sistema operativo, al calor y a la fatiga.
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-8 w-[2px] bg-white/10 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-guardian via-accent to-panic"
              style={{ height: lineHeight }}
            />
          </div>

          {steps.map((step, index) => (
            <AnimatedSection
              key={step.number}
              animation={index % 2 === 0 ? "fade-in-left" : "fade-in-right"}
              delay={0.1 * index}
            >
              <div
                className={`relative mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center ${
                  index % 2 === 0 ? "" : "md:text-right"
                }`}
              >
                <div className={`${index % 2 === 0 ? "md:pr-16" : "md:order-2 md:pl-16"}`}>
                  <div
                    className="inline-flex items-center gap-3 rounded-full px-4 py-1.5 text-sm font-bold"
                    style={{ backgroundColor: `${step.color}15`, color: step.color }}
                  >
                    <span>{step.number}</span>
                    <span>{step.subtitle}</span>
                  </div>
                  <h3 className="mt-4 text-3xl font-bold text-white">{step.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-white/50">{step.description}</p>

                  <div className={`mt-6 flex flex-wrap gap-2 ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                    {step.details.map((detail) => (
                      <span
                        key={detail}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`${index % 2 === 0 ? "md:order-2 md:pl-16" : "md:pr-16"}`}>
                  <div
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
                    style={{ boxShadow: `0 0 40px -20px ${step.color}40` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-5xl font-bold text-white/10">{step.number}</span>
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: step.color, boxShadow: `0 0 20px ${step.color}` }}
                      />
                    </div>
                    <div className="mt-6 space-y-3">
                      {step.details.map((detail) => (
                        <div key={detail} className="flex items-center gap-3">
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: step.color }}
                          />
                          <span className="text-white/70">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline dot */}
                <div
                  className="absolute top-0 left-8 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-night md:left-1/2"
                  style={{ backgroundColor: step.color, boxShadow: `0 0 20px ${step.color}` }}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
