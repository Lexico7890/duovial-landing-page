"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";

const footerLinks = [
  {
    title: "Producto",
    links: [
      { label: "Características", href: "#solucion" },
      { label: "Demo", href: "#demo" },
      { label: "Specs", href: "#specs" },
      { label: "Planes", href: "#planes" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { label: "Sobre nosotros", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contacto", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad", href: "#" },
      { label: "Términos", href: "#" },
      { label: "Disclaimer OIS", href: "#" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer id="descarga" className="relative overflow-hidden px-6 pt-32 pb-12">
      {/* Background constellation */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(0,230,118,0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <AnimatedSection animation="scale-in" className="mb-20 text-center">
          <div className="rounded-3xl border border-guardian/20 bg-guardian/5 p-12 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Tu próximo viaje empieza protegido
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
              Descarga DuoVial y convierte tu Android en un copiloto que nunca duerme.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-guardian/50 focus:bg-white/[0.07]"
                  disabled={isSubmitted}
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitted}
                className="relative min-w-[140px] overflow-hidden rounded-full bg-guardian px-6 py-3.5 text-sm font-bold text-night transition-all hover:shadow-[0_0_30px_-5px_rgba(0,230,118,0.5)] disabled:cursor-not-allowed"
                whileTap={{ scale: 0.97 }}
              >
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Listo
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      Avísame al lanzar
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/40">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-guardian" />
                Android 10+
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-guardian" />
                Kotlin Multiplatform
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-guardian" />
                Sin hardware extra
              </span>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white">
              Duo<span className="text-guardian">Vial</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/40">
              Dashcam inteligente y guardian biométrico para conductores que no quieren depender de la suerte.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group relative text-sm text-white/40 transition-colors hover:text-white"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-guardian transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/30 md:flex-row">
          <p>© 2026 DuoVial. Todos los derechos reservados.</p>
          <p>Android only. Kotlin Multiplatform. Hecho para sobrevivir.</p>
        </div>
      </div>
    </footer>
  );
}
