"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import MagneticButton from "@/components/ui/MagneticButton";

const plans = [
  {
    name: "Free",
    description: "Prueba el concepto sin costo",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Buffer circular (30s)",
      "Auto-inicio por actividad",
      "Guardado local de videos",
      "Anti-somnolencia Nivel 1",
      "Modo offline + limpieza 7d",
    ],
    cta: "Empezar gratis",
    color: "#415A77",
    badge: null,
    planType: "free" as const,
  },
  {
    name: "Por Evento",
    description: "Pagas solo cuando lo necesitas",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Todo lo del plan Free",
      "Procesar video solo cuando hay incidente",
      "Unir y exportar clips",
      "Descargar video procesado",
      "Sin suscripción mensual",
    ],
    cta: "Ver precios por evento",
    color: "#00E5FF",
    badge: "Flexible",
    planType: "event" as const,
  },
  {
    name: "Premium",
    description: "Para conductores profesionales",
    monthlyPrice: 4.99,
    yearlyPrice: 3.99,
    features: [
      "Todo lo de Free + Por Evento",
      "Procesamiento ilimitado de videos",
      "Anti-somnolencia 3 niveles completos",
      "Mantenimiento predictivo",
      "OBD II (requiere dongle ELM327)",
      "Colisión + llamada automática (Twilio)",
    ],
    cta: "Prueba 30 días gratis",
    color: "#00E676",
    badge: "Más popular",
    planType: "subscription" as const,
  },
  {
    name: "Fleet",
    description: "Para empresas con 2+ vehículos",
    monthlyPrice: 19.99,
    yearlyPrice: 15.99,
    features: [
      "Todo lo de Premium",
      "Dashboard web con mapa en vivo",
      "Geofencing (zonas de operación)",
      "Reconocimiento facial (solo alerta)",
      "Toggles on/off por vehículo",
      "Reportes exportables (CSV/PDF)",
      "Métricas de fatiga por conductor",
      "Soporte dedicado",
    ],
    cta: "Contactar ventas",
    color: "#FFB300",
    badge: "Empresas",
    planType: "subscription" as const,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const formatPrice = (plan: typeof plans[0]) => {
    if (plan.planType === "event") return null;
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    return price;
  };

  return (
    <section id="planes" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection animation="fade-in-up" className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-guardian">
            Planes
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Elige tu protección
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Desde $0 hasta dashboard empresarial. Sin contratos forzosos.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-in-up" delay={0.2} className="mb-12 flex items-center justify-center gap-4">
          <span className={`text-sm font-semibold ${!isYearly ? "text-white" : "text-white/40"}`}>
            Mensual
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative h-7 w-14 rounded-full border border-white/20 bg-white/5 transition-colors"
          >
            <motion.div
              className="absolute top-0.5 h-6 w-6 rounded-full bg-guardian"
              animate={{ left: isYearly ? "calc(100% - 26px)" : "2px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm font-semibold ${isYearly ? "text-white" : "text-white/40"}`}>
            Anual
          </span>
          {isYearly && (
            <span className="rounded-full bg-guardian/10 px-2 py-0.5 text-xs font-semibold text-guardian">
              Ahorra 20%
            </span>
          )}
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {plans.map((plan, index) => {
            const price = formatPrice(plan);
            const isEvent = plan.planType === "event";

            return (
              <AnimatedSection
                key={plan.name}
                animation="fade-in-up"
                delay={0.1 * index}
              >
                <motion.div
                  className="relative h-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm"
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  style={{
                    boxShadow: plan.badge === "Más popular" ? `0 0 60px -20px ${plan.color}50` : undefined,
                  }}
                >
                  {plan.badge && (
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-night"
                      style={{ backgroundColor: plan.color }}
                    >
                      {plan.badge}
                    </motion.div>
                  )}

                  <div
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${plan.color}40, transparent 50%, ${plan.color}20)`,
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <p className="mt-2 text-sm text-white/50">{plan.description}</p>

                    <div className="mt-6 flex items-baseline gap-1">
                      {isEvent ? (
                        <span className="text-3xl font-bold text-white">Por uso</span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-white">
                            ${price}
                          </span>
                          {price !== 0 && <span className="text-white/40">/mes</span>}
                          {price === 0 && (
                            <span className="text-white/40">siempre</span>
                          )}
                        </>
                      )}
                    </div>
                    {plan.planType === "event" && (
                      <p className="mt-1 text-xs text-white/40">
                        Procesas y descargas videos solo cuando tienes un incidente
                      </p>
                    )}
                    {plan.planType === "subscription" && plan.monthlyPrice !== 0 && !isYearly && (
                      <p className="mt-1 text-xs text-white/40">
                        {plan.name === "Fleet" ? (isYearly ? "$15.99" : "$19.99") + "/vehículo/mes" : ""}
                      </p>
                    )}

                    <ul className="mt-8 flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-white/70">
                          <svg
                            className="mt-0.5 h-5 w-5 flex-shrink-0"
                            style={{ color: plan.color }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <MagneticButton
                      href="#descarga"
                      className={`mt-8 w-full rounded-full py-3 text-sm font-bold transition-all ${
                        plan.badge === "Más popular"
                          ? "bg-guardian text-night hover:shadow-[0_0_30px_-5px_rgba(0,230,118,0.5)]"
                          : plan.badge === "Empresas"
                          ? "bg-accent text-night hover:shadow-[0_0_30px_-5px_rgba(255,179,0,0.5)]"
                          : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      {plan.cta}
                    </MagneticButton>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection animation="fade-in-up" delay={0.5} className="mt-12 text-center">
          <p className="text-sm text-white/30">
            Precios en USD. Facturación mensual o anual.{' '}
            <span className="text-guardian/60">Cancelas cuando quieras.</span>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
