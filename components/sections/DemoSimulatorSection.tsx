"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import FatigueSimulator from "@/components/ui/FatigueSimulator";
import BufferVisualizer from "@/components/ui/BufferVisualizer";
import TabMorph from "@/components/ui/TabMorph";

export default function DemoSimulatorSection() {
  return (
    <section id="demo" className="relative overflow-hidden px-6 py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-guardian/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimatedSection animation="fade-in-up" className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-guardian">
            Demo interactiva
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Pruébalo antes de instalarlo
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
            Dos simuladores para que entiendas cómo DuoVial piensa antes de que pase algo.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-in-up" delay={0.2}>
          <TabMorph
            tabs={[
              {
                id: "fatigue",
                label: "Anti-Somnolencia",
                content: (
                  <div className="grid grid-cols-1 gap-8 rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm md:grid-cols-2 md:items-center md:p-12">
                    <div>
                      <h3 className="text-2xl font-bold text-white md:text-3xl">
                        ML Kit lee tu rostro en tiempo real
                      </h3>
                      <p className="mt-4 text-white/50">
                        El algoritmo calcula el Eye Aspect Ratio (EAR). Si tus ojos permanecen cerrados más del umbral configurado, dispara vibración + sonido.
                      </p>
                      <ul className="mt-6 space-y-3">
                        {[
                          "Solo activa en FatigueScreen",
                          "No guarda video frontal",
                          "640×480 @ 10fps",
                          "Alerta inmediata",
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-3 text-white/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-guardian" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <FatigueSimulator />
                  </div>
                ),
              },
              {
                id: "buffer",
                label: "Buffer Circular",
                content: (
                  <div className="grid grid-cols-1 gap-8 rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm md:grid-cols-2 md:items-center md:p-12">
                    <div>
                      <h3 className="text-2xl font-bold text-white md:text-3xl">
                        Solo guarda lo importante
                      </h3>
                      <p className="mt-4 text-white/50">
                        La cámara trasera graba en cache circular de 30 segundos. Cuando detecta un evento, conserva 15 segundos antes y 15 después como evidencia.
                      </p>
                      <ul className="mt-6 space-y-3">
                        {[
                          "Sin escritura continua a disco",
                          "2 archivos MP4 por incidente",
                          "Trigger manual + acelerómetro",
                          "Menos calor, más batería",
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-3 text-white/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-guardian" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <BufferVisualizer />
                  </div>
                ),
              },
            ]}
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
