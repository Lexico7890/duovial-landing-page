"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Counter from "@/components/ui/Counter";

const specs = [
  {
    id: "buffer",
    label: "Buffer Circular",
    color: "#00E676",
    metrics: [
      { label: "Resolución", value: "1920×1080", unit: "" },
      { label: "FPS", value: "30", unit: "fps" },
      { label: "Bitrate", value: "2", unit: "Mbps" },
      { label: "Buffer", value: "30", unit: "seg" },
    ],
    specs: [
      "Codec H.264 optimizado",
      "Audio desactivado para ahorrar CPU",
      "Cache del sistema Android (cacheDir)",
      "Foreground Service con START_STICKY",
      "WorkManager Watchdog cada 15 min",
    ],
  },
  {
    id: "fatigue",
    label: "Anti-Somnolencia",
    color: "#FF1744",
    metrics: [
      { label: "Resolución", value: "640×480", unit: "" },
      { label: "FPS", value: "10", unit: "fps" },
      { label: "EAR Default", value: "0.2", unit: "" },
      { label: "Duración", value: "2", unit: "seg" },
    ],
    specs: [
      "ML Kit Face Detection nativo",
      "Cálculo Eye Aspect Ratio (EAR)",
      "Solo activa en FatigueScreen",
      "No guarda video de cámara frontal",
      "Vibración + sonido de alerta",
    ],
  },
  {
    id: "wearables",
    label: "Wearables",
    color: "#00E5FF",
    metrics: [
      { label: "API", value: "Health", unit: "Connect" },
      { label: "Datos", value: "FC", unit: "+ HRV" },
      { label: "Polling", value: "1-5", unit: "min" },
      { label: "Consumo", value: "~100", unit: "mW" },
    ],
    specs: [
      "Lectura de frecuencia cardíaca",
      "Heart Rate Variability (HRV)",
      "SleepSession para calidad de sueño",
      "Pasos y calorías activas",
      "Datos solo local, nunca en servidor",
    ],
  },
  {
    id: "background",
    label: "Background",
    color: "#FFB300",
    metrics: [
      { label: "Service", value: "Lifecycle", unit: "" },
      { label: "Tipo", value: "camera", unit: "+ location" },
      { label: "Reinicio", value: "15", unit: "min" },
      { label: "Estados", value: "3", unit: "" },
    ],
    specs: [
      "LifecycleService robusto",
      "START_STICKY para supervivencia",
      "StateFlow / SharedFlow UI↔Servicio",
      "Máquina de estados: STANDBY / RECORDING / SAVING",
      "Resync de estado al reconectar UI",
    ],
  },
];

export default function TechSpecs() {
  const [activeTab, setActiveTab] = useState(specs[0].id);
  const activeSpec = specs.find((s) => s.id === activeTab)!;

  return (
    <section id="specs" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection animation="fade-in-up" className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Especificaciones
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Ingeniería real, no marketing
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Estos no son números de brochure. Son decisiones técnicas que tomamos para que la app sobreviva a Android.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-in-up" delay={0.2}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-2 backdrop-blur-sm md:p-3">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 rounded-2xl border border-white/5 bg-white/5 p-2">
              {specs.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setActiveTab(spec.id)}
                  className={`relative flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-300 ${
                    activeTab === spec.id ? "text-night" : "text-white/60 hover:text-white"
                  }`}
                >
                  {activeTab === spec.id && (
                    <motion.div
                      layoutId="specActiveTab"
                      className="absolute inset-0 rounded-xl"
                      style={{ backgroundColor: spec.color }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{spec.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="mt-8 p-4 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Metrics grid */}
                  <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {activeSpec.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:border-white/20"
                      >
                        <div
                          className="text-3xl font-bold md:text-4xl"
                          style={{ color: activeSpec.color }}
                        >
                          {metric.label === "Bitrate" || metric.label === "Consumo" || metric.label === "Duración" || metric.label === "Reinicio" ? (
                            <Counter end={Number(metric.value)} suffix={metric.unit ? ` ${metric.unit}` : ""} decimals={metric.value.includes(".") ? 1 : 0} />
                          ) : (
                            <>
                              {metric.value}
                              {metric.unit && (
                                <span className="text-lg text-white/40"> {metric.unit}</span>
                              )}
                            </>
                          )}
                        </div>
                        <div className="mt-2 text-sm text-white/40">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Specs list */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {activeSpec.specs.map((spec, index) => (
                      <motion.div
                        key={spec}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                      >
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-night"
                          style={{ backgroundColor: activeSpec.color }}
                        >
                          {index + 1}
                        </div>
                        <span className="text-white/70">{spec}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
