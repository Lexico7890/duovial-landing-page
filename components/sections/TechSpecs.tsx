"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

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
    details: [
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
    color: "#FFB300",
    metrics: [
      { label: "Resolución", value: "640×480", unit: "" },
      { label: "FPS", value: "10", unit: "fps" },
      { label: "EAR Default", value: "0.2", unit: "" },
      { label: "Niveles", value: "3", unit: "" },
    ],
    details: [
      "ML Kit Face Detection nativo",
      "Cálculo Eye Aspect Ratio (EAR)",
      "Solo activa en FatigueScreen",
      "Nivel 1: Acompañante (sugerencias)",
      "Nivel 2: Despertador (alarma fuerte)",
      "Nivel 3: Ángel Guardián (SMS emergencia)",
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
    details: [
      "Lectura de frecuencia cardíaca y HRV",
      "SleepSession para calidad de sueño",
      "Detección en background sin cámara",
      "10+ dispositivos compatibles",
      "Datos solo local, nunca en servidor",
    ],
  },
  {
    id: "autostart",
    label: "Auto-Inicio",
    color: "#00E676",
    metrics: [
      { label: "API", value: "Activity", unit: "Recognition" },
      { label: "Trigger", value: ">15", unit: "km/h" },
      { label: "Duración", value: "15", unit: "seg" },
      { label: "Auto-stop", value: "2", unit: "min" },
    ],
    details: [
      "Google Activity Recognition API",
      "Se activa al detectar conducción",
      "Notificación al usuario con opción de cancelar",
      "Se auto-detiene al detectar caminata",
      "Datos de actividad no se guardan",
    ],
  },
  {
    id: "fleet",
    label: "Capa Fleet",
    color: "#FF1744",
    metrics: [
      { label: "Geofencing", value: "500", unit: "m radio" },
      { label: "Facial", value: "1 foto", unit: "/viaje" },
      { label: "OBD II", value: "ELM327", unit: "Bt LE" },
      { label: "Precio", value: "$19.99", unit: "/vehículo" },
    ],
    details: [
      "Geofencing: zonas de operación",
      "Facial: solo alerta, nunca bloqueo",
      "OBD II: RPM, temp, voltaje, DTC",
      "Dashboard web con mapa en vivo",
      "Toggles on/off por vehículo",
      "Reportes exportables CSV/PDF",
    ],
  },
  {
    id: "collision",
    label: "Colisión + Twilio",
    color: "#FFB300",
    metrics: [
      { label: "Filtro", value: ">40", unit: "km/h" },
      { label: "G-Force", value: ">3.5", unit: "G" },
      { label: "Duración", value: ">150", unit: "ms" },
      { label: "Llamada", value: "IVR", unit: "Twilio" },
    ],
    details: [
      "Filtro de velocidad para evitar falsos positivos",
      "Subida automática de video a AWS S3",
      "Llamada IVR: ¿Estás bien? Presiona 1 o 2",
      "SMS a contacto de emergencia con ubicación",
      "Notificación push al Admin (Fleet)",
    ],
  },
];

export default function TechSpecs() {
  const [activeTab, setActiveTab] = useState(specs[0].id);
  const activeSpec = specs.find((s) => s.id === activeTab)!;

  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection animation="fade-in-up" className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Especificaciones
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Ingeniería real, no marketing
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Cada decisión técnica está documentada. Cada módulo existe por una razón.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-in-up" delay={0.2}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-2 backdrop-blur-sm md:p-3">
            <div className="flex flex-wrap gap-2 rounded-2xl border border-white/5 bg-white/5 p-2">
              {specs.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setActiveTab(spec.id)}
                  className={`relative flex-1 rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors duration-300 sm:text-sm ${
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

            <div className="mt-8 p-4 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {activeSpec.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition-all duration-300 hover:border-white/20 md:p-6"
                      >
                        <div
                          className="text-2xl font-bold md:text-3xl"
                          style={{ color: activeSpec.color }}
                        >
                          {metric.value}
                          {metric.unit && (
                            <span className="text-sm text-white/40"> {metric.unit}</span>
                          )}
                        </div>
                        <div className="mt-2 text-sm text-white/40">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {activeSpec.details.map((detail, index) => (
                      <motion.div
                        key={detail}
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
                        <span className="text-white/70">{detail}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Architecture diagram placeholder */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 overflow-hidden rounded-2xl border border-white/10"
                  >
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src="/images/architecture.jpg"
                        alt="Diagrama de arquitectura DuoVial"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent" />
                    </div>
                    <p className="px-4 py-3 text-center text-sm text-white/40">
                      Diagrama de referencia de la arquitectura técnica
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
