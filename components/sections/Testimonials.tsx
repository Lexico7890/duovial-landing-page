"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import KineticCarousel from "@/components/ui/KineticCarousel";
import TiltCard from "@/components/ui/TiltCard";

const testimonials = [
  {
    quote: "Antes tenía una dash cam de $150. Ahora uso DuoVial en mi Android viejo y funciona igual. La batería me dura toda la jornada.",
    author: "Carlos M.",
    role: "Conductor Uber",
    avatar: "/images/testimonial-1.jpg",
    color: "#00E676",
  },
  {
    quote: "El anti-somnolencia me salvó en un viaje largo. La alerta sonó justo cuando estaba perdiendo concentración en la autopista.",
    author: "Andrea L.",
    role: "Repartidora",
    avatar: "/images/testimonial-2.jpg",
    color: "#FFB300",
  },
  {
    quote: "Como padre, poder monitorear que mi hijo no se quede dormido al volante me da una paz que no tiene precio.",
    author: "Roberto S.",
    role: "Padre de conductor joven",
    avatar: "/images/testimonial-3.jpg",
    color: "#00E5FF",
  },
  {
    quote: "Tuve un choque menor y el video del buffer circular fue clave. Lo tuve en segundos, sin buscar en horas de grabación.",
    author: "Miguel T.",
    role: "Taxista",
    avatar: "/images/testimonial-4.jpg",
    color: "#FF1744",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection animation="fade-in-up" className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-guardian">
            Testimonios
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Conductores que ya no van solos
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-in-up" delay={0.2}>
          <KineticCarousel>
            {testimonials.map((testimonial) => (
              <TiltCard key={testimonial.author} className="h-full" tiltAmount={6}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm md:p-10">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative h-14 w-14 overflow-hidden rounded-full"
                      style={{ boxShadow: `0 0 0 2px ${testimonial.color}` }}
                    >
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.author}</h4>
                      <p className="text-sm text-white/50">{testimonial.role}</p>
                    </div>
                  </div>

                  <blockquote className="mt-6 text-lg leading-relaxed text-white/70 md:text-xl">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="mt-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5"
                        style={{ color: testimonial.color }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </KineticCarousel>
        </AnimatedSection>
      </div>
    </section>
  );
}
