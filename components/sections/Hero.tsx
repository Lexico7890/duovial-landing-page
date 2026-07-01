"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import DuoVialLogo from "@/components/ui/DuoVialLogo";
import RadarBackground from "@/components/ui/RadarBackground";
import MagneticButton from "@/components/ui/MagneticButton";
import Counter from "@/components/ui/Counter";
import VideoModal from "@/components/ui/VideoModal";

const DEMO_VIDEO_URL = "https://www.youtube.com/embed/YlUKcNNmywk?autoplay=1";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.duovial.app";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const springConfig = { stiffness: 100, damping: 30 };
  const mouseX = useSpring(0.5, springConfig);
  const mouseY = useSpring(0.5, springConfig);

  const rotateX = useTransform(mouseY, [0, 1], [12, -12]);
  const rotateY = useTransform(mouseX, [0, 1], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !spotlightRef.current || !gridRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);

    const xPct = x * 100;
    const yPct = y * 100;

    spotlightRef.current.style.background = `radial-gradient(800px circle at ${xPct}% ${yPct}%, rgba(0,230,118,0.08), transparent 40%)`;
    gridRef.current.style.maskImage = `radial-gradient(ellipse at ${xPct}% ${yPct}%, black 0%, transparent 60%)`;
    gridRef.current.style.webkitMaskImage = `radial-gradient(ellipse at ${xPct}% ${yPct}%, black 0%, transparent 60%)`;
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(800px circle at 50% 50%, rgba(0,230,118,0.08), transparent 40%)`;
    }
    if (gridRef.current) {
      gridRef.current.style.maskImage = `radial-gradient(ellipse at 50% 50%, black 0%, transparent 60%)`;
      gridRef.current.style.webkitMaskImage = `radial-gradient(ellipse at 50% 50%, black 0%, transparent 60%)`;
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-24"
    >
      {/* Cursor spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at 50% 50%, rgba(0,230,118,0.08), transparent 40%)`,
        }}
      />

      {/* Grid overlay */}
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,230,118,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: `radial-gradient(ellipse at 50% 50%, black 0%, transparent 60%)`,
          WebkitMaskImage: `radial-gradient(ellipse at 50% 50%, black 0%, transparent 60%)`,
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(65,90,119,0.35)_0%,_rgba(13,27,42,0)_70%)]" />

      {/* Hero background image */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <Image
          src="/images/hero.jpg"
          alt="DuoVial hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/80 to-night" />
      </div>

      <RadarBackground waveCount={4} duration={3.5} />

      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center">
        {/* Badge */}
        <AnimatedSection animation="fade-in-down" delay={0.1}>
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-guardian/30 bg-guardian/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-guardian"
            animate={{ boxShadow: ["0 0 0 0 rgba(0,230,118,0)", "0 0 20px 2px rgba(0,230,118,0.2)", "0 0 0 0 rgba(0,230,118,0)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-guardian opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-guardian" />
            </span>
            Android Only • Kotlin Multiplatform
          </motion.div>
        </AnimatedSection>

        {/* Main headline */}
        <AnimatedSection animation="fade-in-up" delay={0.2} className="text-center">
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
            Tu teléfono es tu{" "}
            <span className="bg-gradient-to-r from-guardian via-accent to-guardian bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
              copiloto
            </span>
          </h1>
        </AnimatedSection>

        {/* Subheadline */}
        <AnimatedSection animation="fade-in-up" delay={0.3} className="mt-6 text-center">
          <p className="max-w-2xl text-lg text-white/60 md:text-xl">
            Evidencia legal instantánea + detección de fatiga con ML Kit. Para conductores individuales y flotas empresariales desde la misma app.
          </p>
        </AnimatedSection>

        {/* Interactive logo + feature columns */}
        <div className="mt-16 grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-3">
          <AnimatedSection animation="fade-in-left" delay={0.4} className="text-center lg:text-right">
            <div className="group space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-panic/30 hover:bg-white/[0.07]">
              <h2 className="text-3xl font-bold tracking-tight text-panic md:text-4xl">
                EVIDENCIA
              </h2>
              <p className="mx-auto max-w-xs text-base leading-relaxed text-white/50 lg:ml-auto lg:mr-0">
                Buffer circular de 30 segundos. Solo guarda cuando detecta un evento o presionas pánico.
              </p>
              <div className="flex justify-center gap-4 text-sm font-semibold text-white/70 lg:justify-end">
                <span className="text-panic">1080p</span>
                <span>•</span>
                <span>2 Mbps</span>
                <span>•</span>
                <span>H.264</span>
              </div>
            </div>
          </AnimatedSection>

          <div
            className="flex flex-col items-center justify-center"
            style={{ perspective: 1000 }}
          >
            <AnimatedSection animation="scale-in" delay={0.5}>
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
              >
                <DuoVialLogo size={300} />
              </motion.div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-in-right" delay={0.4} className="text-center lg:text-left">
            <div className="group space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-guardian/30 hover:bg-white/[0.07]">
              <h2 className="text-3xl font-bold tracking-tight text-guardian md:text-4xl">
                SUPERVIVENCIA
              </h2>
              <p className="mx-auto max-w-xs text-base leading-relaxed text-white/50 lg:ml-0 lg:mr-auto">
                ML Kit detecta microsueños en tiempo real. Wearables vía Health Connect para background.
              </p>
              <div className="flex justify-center gap-4 text-sm font-semibold text-white/70 lg:justify-start">
                <span className="text-guardian">ML Kit</span>
                <span>•</span>
                <span>Health Connect</span>
                <span>•</span>
                <span>EAR</span>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Stats */}
        <AnimatedSection animation="fade-in-up" delay={0.6} className="mt-16">
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-guardian md:text-4xl">
                <Counter end={40} suffix="%" />
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/40 md:text-sm">
                Menos batería
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent md:text-4xl">
                <Counter end={30} suffix="s" />
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/40 md:text-sm">
                De evidencia
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl">
                <Counter end={11} suffix="" />
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/40 md:text-sm">
                Módulos integrados
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <MagneticButton
            onClick={() => setIsVideoOpen(true)}
            className="rounded-full bg-guardian px-8 py-3.5 text-sm font-bold text-night shadow-[0_0_30px_-5px_rgba(0,230,118,0.4)] transition-shadow hover:shadow-[0_0_40px_-5px_rgba(0,230,118,0.6)]"
          >
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Ver cómo funciona
            </span>
          </MagneticButton>

          <MagneticButton
            href={GOOGLE_PLAY_URL}
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10"
          >
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
              </svg>
              Disponible en Google Play
            </span>
          </MagneticButton>
        </motion.div>
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={DEMO_VIDEO_URL}
        title="DuoVial en acción"
      />
    </section>
  );
}
