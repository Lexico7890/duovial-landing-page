"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FatigueSimulator from "@/components/ui/FatigueSimulator";

const levels = [
  {
    level: 1,
    name: "El Acompañante",
    emoji: "🟢",
    trigger: "FC elevada + HRV baja. Conducción >2h.",
    actions: [
      "Sugerencia de ruta a gasolinera/descanso",
      "Sugerencia: bajar A/C 1.5°C, subir brillo",
      "Playlist energética (120+ BPM)",
    ],
    color: "#00E676",
    gradient: "from-guardian/20 to-transparent",
  },
  {
    level: 2,
    name: "El Despertador",
    emoji: "🟡",
    trigger: "ML Kit: EAR bajo. Wearable: sin movimiento.",
    actions: [
      "Alarma sonora fuerte + Vibración intensa",
      "Pantalla roja parpadeante",
      'Voz: "¡CONDUCTOR, MANTÉN LOS OJOS ABIERTOS!"',
    ],
    color: "#FFB300",
    gradient: "from-amber/20 to-transparent",
  },
  {
    level: 3,
    name: "El Ángel Guardián",
    emoji: "🔴",
    trigger: "No responde al Nivel 2 en 8s. Ojos cerrados >3s.",
    actions: [
      "SMS + notificación PUSH a contacto de emergencia",
      "Ubicación en Google Maps para rescate",
      "Reduce volumen, instrucciones de voz para detenerse",
    ],
    color: "#FF1744",
    gradient: "from-panic/20 to-transparent",
  },
];

export default function FatigueLevelsSection() {
  const [activeLevel, setActiveLevel] = useState(0);

  return (
    <section id="fatiga" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <AnimatedSection animation="fade-in-up" className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Anti-Somnolencia 3 Niveles
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Tu copiloto no descansa
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Escalada inteligente. No solo te avisa que tienes sueño — actúa antes de que cierres los ojos.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center">
          {/* Level cards */}
          <div className="space-y-4 lg:col-span-1">
            {levels.map((level, index) => (
              <AnimatedSection key={level.level} animation="fade-in-left" delay={0.1 * index}>
                <button
                  onClick={() => setActiveLevel(index)}
                  className={`group relative w-full rounded-2xl border p-6 text-left transition-all duration-500 ${
                    activeLevel === index
                      ? "border-white/30 bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  {activeLevel === index && (
                    <motion.div
                      layoutId="activeLevelBg"
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${level.color}10, transparent 60%)`,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{level.emoji}</span>
                      <div>
                        <h3
                          className="text-lg font-bold"
                          style={{ color: level.color }}
                        >
                          Nivel {level.level}: {level.name}
                        </h3>
                        <p className="mt-1 text-sm text-white/50">{level.trigger}</p>
                      </div>
                    </div>
                    {activeLevel === index && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-2"
                      >
                        {level.actions.map((action) => (
                          <li key={action} className="flex items-center gap-2 text-sm text-white/70">
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: level.color }}
                            />
                            {action}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>

          {/* Simulator + active level detail */}
          <div className="lg:col-span-2">
            <AnimatedSection animation="fade-in-right" delay={0.3}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm md:p-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
                  <div className="flex flex-col items-center">
                    <FatigueSimulator />
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: levels[activeLevel].color }}
                    >
                      {levels[activeLevel].emoji} Nivel {levels[activeLevel].level}
                    </h3>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {levels[activeLevel].name}
                    </p>
                    <p className="mt-4 text-white/50">{levels[activeLevel].trigger}</p>

                    <ul className="mt-6 space-y-3">
                      {levels[activeLevel].actions.map((action, i) => (
                        <motion.li
                          key={action}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 text-white/70"
                        >
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-night"
                            style={{ backgroundColor: levels[activeLevel].color }}
                          >
                            {i + 1}
                          </div>
                          {action}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-white/40">
                        <strong className="text-white/70">Plan: </strong>
                        {activeLevel === 0
                          ? "Nivel 1 disponible en Free y Por Evento."
                          : "Niveles 2 y 3 exclusivos de Premium y Fleet."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
