"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const mockVehicles = [
  { id: "VH-001", driver: "Carlos M.", status: "active", location: "Av. Reforma 234", speed: "45 km/h", battery: "%", icon: "🚗" },
  { id: "VH-002", driver: "Andrea L.", status: "idle", location: "Zona de carga Centro", speed: "0 km/h", battery: "%", icon: "🚐" },
  { id: "VH-003", driver: "Miguel T.", status: "active", location: "Periférico Sur km 12", speed: "68 km/h", battery: "%", icon: "🚗" },
  { id: "VH-004", driver: "No asignado", status: "offline", location: "—", speed: "—", battery: "%", icon: "🏍️" },
];

const toggles = [
  { label: "Reconocimiento Facial", key: "facial", fleetOnly: true },
  { label: "Anti-somnolencia", key: "fatigue", fleetOnly: false },
  { label: "OBD II", key: "obd", fleetOnly: true },
  { label: "Geofencing", key: "geo", fleetOnly: true },
];

export default function DashboardFleetSection() {
  const [toggleStates, setToggleStates] = useState({
    facial: true,
    fatigue: true,
    obd: false,
    geo: true,
  });

  const [activeVehicle, setActiveVehicle] = useState(0);

  return (
    <section id="dashboard" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection animation="fade-in-up" className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-guardian">
            DuoVial Fleet
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            El cerebro de tu flota
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Dashboard web con mapa en vivo, gestión de conductores y toggles por vehículo. Todo en tiempo real.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-in-up" delay={0.2}>
          <div className="overflow-hidden rounded-3xl border border-guardian/20 bg-white/[0.02] backdrop-blur-sm">
            {/* Dashboard header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-panic" />
                  <div className="h-3 w-3 rounded-full bg-accent" />
                  <div className="h-3 w-3 rounded-full bg-guardian" />
                </div>
                <span className="text-sm font-medium text-white/50">Dashboard DuoVial Fleet</span>
              </div>
              <span className="flex items-center gap-2 text-xs text-guardian">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-guardian opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-guardian" />
                </span>
                En vivo
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
              {/* Vehicle list */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">Vehículos activos</h3>
                <div className="space-y-2">
                  {mockVehicles.map((vehicle, index) => (
                    <button
                      key={vehicle.id}
                      onClick={() => setActiveVehicle(index)}
                      className={`w-full rounded-xl border p-3 text-left transition-all duration-200 ${
                        activeVehicle === index
                          ? "border-guardian/30 bg-guardian/5"
                          : "border-white/5 bg-white/[0.02] hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{vehicle.icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-white">{vehicle.id}</p>
                            <p className="text-xs text-white/50">{vehicle.driver}</p>
                          </div>
                        </div>
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            vehicle.status === "active"
                              ? "bg-guardian"
                              : vehicle.status === "idle"
                              ? "bg-accent"
                              : "bg-white/20"
                          }`}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dashboard screenshot placeholder */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:col-span-2">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/dashboard.jpg"
                    alt="Dashboard DuoVial Fleet"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="border-t border-white/10 p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">Configuración por vehículo</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {toggles.map((toggle) => (
                  <div
                    key={toggle.key}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{toggle.label}</p>
                      {toggle.fleetOnly && (
                        <p className="text-xs text-guardian/60">Exclusivo Fleet</p>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        setToggleStates((prev) => ({
                          ...prev,
                          [toggle.key]: !prev[toggle.key as keyof typeof prev],
                        }))
                      }
                      className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
                        toggleStates[toggle.key as keyof typeof toggleStates] ? "bg-guardian" : "bg-white/10"
                      }`}
                    >
                      <motion.div
                        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md"
                        animate={{
                          left: toggleStates[toggle.key as keyof typeof toggleStates] ? "calc(100% - 22px)" : "2px",
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats bar */}
            <div className="border-t border-white/10 p-6">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">4</p>
                  <p className="text-xs text-white/40">Vehículos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-guardian">2</p>
                  <p className="text-xs text-white/40">En ruta</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">12</p>
                  <p className="text-xs text-white/40">Incidentes/mes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">99.8%</p>
                  <p className="text-xs text-white/40">Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
