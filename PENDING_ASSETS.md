# 🖼️ Assets Pendientes — DuoVial Landing Page

Este documento lista todos los espacios visuales reservados para imágenes, videos o mockups que deben agregarse en el futuro. Actualmente la landing funciona 100% con SVG generados por código y animaciones, pero estos assets elevarían aún más la conversión.

---

## 1. Hero Section

**Ubicación:** `components/sections/Hero.tsx`
**Espacio reservado:** Fondo derecho/izquierdo del hero, junto al logo central.
**Tipo recomendado:** Video corto (15–20s) o imagen estática.
**Contenido sugerido:**
- Un teléfono Android montado en el parabrisas de un carro.
- La app visible en modo Vigilante con overlay de telemetría (G-Force, velocidad).
- Ambiente nocturno/urbano para mantener la estética.
**Formato:** MP4 (loop, muted, autoplay) o WebP estático.
**Prioridad:** Alta — es la primera impresión.

---

## 2. ProblemSection

**Ubicación:** `components/sections/ProblemSection.tsx`
**Espacio reservado:** Columna derecha del bloque de storytelling (debajo del blockquote).
**Tipo recomendado:** Ilustración o imagen estilizada.
**Contenido sugerido:**
- Dos conductores discutiendo frente a vehículos con daños menores.
- O una ilustración de "palabra contra palabra" / falta de evidencia.
- Debe ser no gráfica y apta para landing comercial.
**Formato:** WebP o SVG ilustrativo.
**Prioridad:** Media — el texto actual ya cuenta la historia.

---

## 3. HowItWorks Section

**Ubicación:** `components/sections/HowItWorks.tsx`
**Espacio reservado:** Tarjetas laterales de cada paso (columna opuesta al texto).
**Tipo recomendado:** 4 ilustraciones o screenshots de la app.
**Contenido sugerido por paso:**
1. **Modo Vigilante:** Screenshot de `MonitorScreen.kt` con preview de cámara trasera y telemetría.
2. **Detección de eventos:** Screenshot del botón de pánico y medidor G-Force.
3. **Guardado inteligente:** Diagrama o screenshot de la lista de incidentes guardados.
4. **Anti-Somnolencia:** Screenshot de `FatigueScreen.kt` con preview frontal y barra EAR.
**Formato:** WebP con bordes redondeados.
**Prioridad:** Alta — ayuda a entender el flujo.

---

## 4. TechSpecs Section

**Ubicación:** `components/sections/TechSpecs.tsx`
**Espacio reservado:** No hay espacio explícito, pero se recomienda agregar un diagrama de arquitectura.
**Tipo recomendado:** Diagrama técnico o infografía.
**Contenido sugerido:**
- Diagrama de flujo: Cámara trasera → Buffer Circular → Triggers → Guardado.
- O diagrama de arquitectura: UI Compose ↔ Servicio Nativo ↔ CameraX ↔ ML Kit ↔ Health Connect.
**Formato:** SVG (escalable) o WebP.
**Prioridad:** Media — refuerza la credibilidad tech.

---

## 5. DemoSimulator Section

**Ubicación:** `components/sections/DemoSimulatorSection.tsx`
**Espacio reservado:** No requiere assets externos.
**Nota:** Los simuladores de fatiga y buffer circular están completamente implementados con SVG y estado interactivo. No se necesitan imágenes aquí.
**Prioridad:** No aplica.

---

## 6. Pricing Section

**Ubicación:** `components/sections/Pricing.tsx`
**Espacio reservado:** No hay espacio explícito.
**Tipo recomendado:** Badge/iconos de métodos de pago o QR de descarga.
**Contenido sugerido:**
- Iconos de Google Play, tarjetas de crédito, MercadoPago/PayU según región.
- QR para descarga directa del APK.
**Formato:** SVG.
**Prioridad:** Baja.

---

## 7. Testimonials Section

**Ubicación:** `components/sections/Testimonials.tsx`
**Espacio reservado:** Avatares circulares con iniciales.
**Tipo recomendado:** Fotos reales de conductores (con permiso) o avatares generados.
**Contenido sugerido:**
- 4 fotos de rostros reales de conductores.
- Preferiblemente diversidad de género y edad para reflejar los segmentos.
**Formato:** WebP cuadrado, 200×200px.
**Prioridad:** Media — avatares con iniciales funcionan pero fotos reales generan más confianza.

---

## 8. Footer / CTA Final

**Ubicación:** `components/sections/Footer.tsx`
**Espacio reservado:** No hay espacio explícito.
**Tipo recomendado:** Badge de Google Play + QR.
**Contenido sugerido:**
- Botón "Disponible en Google Play" oficial.
- QR que apunte al listing de Play Store.
**Formato:** SVG + PNG del QR.
**Prioridad:** Alta — facilita la conversión final.

---

## 📋 Checklist de Assets

- [ ] Video/imagen del Hero (teléfono en parabrisas)
- [ ] Ilustración de ProblemSection
- [ ] 4 screenshots de la app para HowItWorks
- [ ] Diagrama de arquitectura para TechSpecs
- [ ] Fotos/avatars para Testimonials
- [ ] Badge de Google Play + QR para Footer

---

## 💾 Ubicación recomendada para assets

```
landing-page/
├── public/
│   ├── hero-video.mp4
│   ├── hero-poster.webp
│   ├── problem-illustration.webp
│   ├── how-it-works/
│   │   ├── step-1-vigilante.webp
│   │   ├── step-2-triggers.webp
│   │   ├── step-3-saved.webp
│   │   └── step-4-fatigue.webp
│   ├── architecture-diagram.svg
│   ├── testimonials/
│   │   ├── carlos.jpg
│   │   ├── andrea.jpg
│   │   ├── roberto.jpg
│   │   └── miguel.jpg
│   ├── google-play-badge.svg
│   └── download-qr.png
```

---

**Nota:** Todos los componentes están diseñados para funcionar sin estos assets. Cuando estén disponibles, se integrarán como `<Image />` de Next.js o `<video />` optimizados, sin romper el layout existente.
