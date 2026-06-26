"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const steps = [
  {
    number: "01",
    title: "Auto-Inicio",
    subtitle: "Activity Recognition",
    description: "Subes al auto, arrancas. DuoVial detecta que estás conduciendo y se activa sola. Sin tocar nada.",
    color: "#00E676",
    image: "/images/howitworks-1.jpg",
    details: ["Activity Recognition API", ">15 km/h por 15s", "Notificación automática", "Se auto-detiene al caminar"],
  },
  {
    number: "02",
    title: "Modo Vigilante",
    subtitle: "Buffer circular en cache",
    description: "Cámara trasera graba continuamente pero NO escribe a disco. Solo 30 segundos en memoria cache del sistema.",
    color: "#00E676",
    image: "/images/howitworks-2.jpg",
    details: ["1080p @ 30fps", "H.264 @ 2 Mbps", "Audio desactivado", "Foreground Service"],
  },
  {
    number: "03",
    title: "Anti-Somnolencia 3 Niveles",
    subtitle: "ML Kit + Health Connect + Twilio",
    description: "Escalada inteligente: desde sugerencias preventivas hasta alerta de emergencia con SMS a tu contacto de confianza.",
    color: "#FFB300",
    image: "/images/howitworks-3.jpg",
    details: ["Nivel 1: Acompañante (prevención)", "Nivel 2: Despertador (alerta)", "Nivel 3: Ángel Guardián (emergencia)"],
  },
  {
    number: "04",
    title: "Detección de eventos",
    subtitle: "Multi-sensor + Colisión",
    description: "Botón de pánico + acelerómetro + colisión con filtro de velocidad (>40km/h). Múltiples triggers para no fallar.",
    color: "#FF1744",
    image: "/images/howitworks-4.jpg",
    details: ["Botón de pánico manual", "G-Force configurable (1.5–5.0G)", "Colisión + llamada Twilio", "Cooldown 12s"],
  },
  {
    number: "05",
    title: "Capa Fleet",
    subtitle: "Geofencing + Facial + OBD II",
    description: "Control de zonas de operación, reconocimiento de conductores y datos mecánicos en tiempo real vía puerto OBD II.",
    color: "#00E5FF",
    image: "/images/howitworks-5.jpg",
    details: ["Geofencing API (500m radio)", "Facial: solo alerta", "OBD II ELM327 (Bt LE)", "Dashboard web"],
  },
  {
    number: "06",
    title: "Modo Offline + Limpieza",
    subtitle: "Sin internet no hay problema",
    description: "GPS y logs se guardan en SQLite local. Al volver la señal, sincronizan solos. Videos se limpian automáticamente a los 7 días.",
    color: "#415A77",
    image: "/images/howitworks-6.jpg",
    details: ["SQLite local", "Sincronización automática", "Limpieza 7 días", "Notificación previa"],
  },
];

function StepCard({
  step,
}: {
  step: typeof steps[0];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, {
    once: true,
    amount: 0.4,
  });

  return (
    <div ref={cardRef}>
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
        initial={false}
        animate={{
          borderColor: isInView ? `${step.color}40` : "rgba(255,255,255,0.1)",
          boxShadow: isInView ? `0 0 40px -15px ${step.color}50` : "none",
        }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {/* Step image */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-night/80"
            initial={false}
            animate={{ opacity: isInView ? 0 : 0.85 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
        </div>

        {/* Dark silhouette overlay when inactive */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 bg-night/85"
          initial={false}
          animate={{ opacity: isInView ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        />

        {/* Flash effect on activation */}
        {isInView && (
          <motion.div
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 z-30"
            style={{
              background: `radial-gradient(circle at center, ${step.color} 0%, transparent 60%)`,
            }}
          />
        )}

        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-white/10">{step.number}</span>
            <motion.div
              className="h-3 w-3 rounded-full"
              initial={false}
              animate={{
                backgroundColor: step.color,
                boxShadow: isInView ? `0 0 20px ${step.color}` : `0 0 5px ${step.color}`,
                scale: isInView ? 1.2 : 1,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="mt-4 space-y-2">
            {step.details.map((detail) => (
              <div key={detail} className="flex items-center gap-3">
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: step.color }}
                />
                <span className="text-white/70 text-sm">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

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
            Seis capas de protección activa
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Desde el auto-inicio hasta la llamada automática en colisión. Todo diseñado para sobrevivir al sistema operativo.
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-8 w-[2px] bg-white/10 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-guardian via-accent to-asphalt"
              style={{ height: lineHeight }}
            />
          </div>

          {steps.map((step, index) => (
            <AnimatedSection
              key={step.number}
              animation={index % 2 === 0 ? "fade-in-left" : "fade-in-right"}
              delay={0.05 * index}
            >
              <div
                className={`relative mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center ${
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

                  <div className={`mt-4 flex flex-wrap gap-2 ${index % 2 === 0 ? "" : "md:justify-end"}`}>
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
                  <StepCard step={step} />
                </div>

                {/* Timeline dot */}
                <TimelineDot step={step} index={index} scrollYProgress={scrollYProgress} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineDot({
  step,
  index,
  scrollYProgress,
}: {
  step: typeof steps[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const totalSteps = steps.length;
  const stepSize = 1 / totalSteps;
  const start = index * stepSize;
  const end = start + stepSize;

  const activation = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.div
      className="absolute top-0 left-8 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-night md:left-1/2"
      style={{
        backgroundColor: step.color,
        boxShadow: useTransform(activation, [0, 1], [`0 0 5px ${step.color}`, `0 0 25px ${step.color}`]),
        scale: useTransform(activation, [0, 1], [1, 1.2]),
      }}
    />
  );
}
