"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import MagneticButton from "@/components/ui/MagneticButton";

const plans = [
  {
    name: "Gratis",
    description: "Para probar el concepto",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Buffer circular",
      "5 incidentes/mes",
      "Botón de pánico",
      "Acelerómetro 2.5G",
      "Anti-somnolencia básico",
    ],
    cta: "Descargar gratis",
    popular: false,
    color: "#415A77",
  },
  {
    name: "Premium",
    description: "Para conductores profesionales",
    monthlyPrice: 4.99,
    yearlyPrice: 3.99,
    features: [
      "Todo lo del plan Gratis",
      "Incidentes ilimitados",
      "Exportar videos",
      "Umbral G-Force configurable",
      "Configuración avanzada de fatiga",
      "Soporte prioritario",
    ],
    cta: "Empezar prueba",
    popular: true,
    color: "#00E676",
  },
  {
    name: "Flota",
    description: "Para empresas de transporte",
    monthlyPrice: 19.99,
    yearlyPrice: 15.99,
    features: [
      "Todo lo del plan Premium",
      "Dashboard web",
      "Múltiples vehículos",
      "Reportes consolidados",
      "API de eventos",
      "Soporte dedicado",
    ],
    cta: "Contactar ventas",
    popular: false,
    color: "#00E5FF",
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="planes" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection animation="fade-in-up" className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-guardian">
            Planes
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Elige tu blindaje
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Menos de lo que cuesta un café por semana para no quedar en la ruina tras un accidente.
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <AnimatedSection
              key={plan.name}
              animation="fade-in-up"
              delay={0.1 * index}
            >
              <motion.div
                className="relative h-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm"
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                style={{
                  boxShadow: plan.popular ? `0 0 60px -20px ${plan.color}50` : undefined,
                }}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-night"
                    style={{ backgroundColor: plan.color }}
                  >
                    Más popular
                  </motion.div>
                )}

                {/* Animated border on hover */}
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
                    <span className="text-4xl font-bold text-white">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-white/40">/mes</span>
                  </div>

                  <ul className="mt-8 flex-1 space-y-4">
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
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <MagneticButton
                    href="#descarga"
                    className={`mt-8 w-full rounded-full py-3 text-sm font-bold transition-all ${
                      plan.popular
                        ? "bg-guardian text-night hover:shadow-[0_0_30px_-5px_rgba(0,230,118,0.5)]"
                        : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                  </MagneticButton>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
