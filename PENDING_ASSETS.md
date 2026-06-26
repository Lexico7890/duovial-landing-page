# 🖼️ Assets Pendientes — DuoVial Landing Page v2.0

Este documento lista todos los espacios visuales reservados para imágenes, videos o mockups que deben agregarse en el futuro. Actualmente la landing funciona 100% con SVG generados por código y animaciones.

---

## 1. Hero Section

**Ubicación:** `components/sections/Hero.tsx`
**Tipo recomendado:** Video corto (15–20s) o imagen estática.
**Contenido sugerido:**
- Un teléfono Android montado en el parabrisas de un carro.
- La app visible en modo Vigilante con overlay de telemetría.
- Ambiente nocturno/urbano.
**Formato:** MP4 (loop, muted, autoplay) o WebP estático.
**Prioridad:** Alta.

---

## 2. ProblemSection

**Ubicación:** `components/sections/ProblemSection.tsx`
**Tipo recomendado:** Ilustración estilizada.
**Contenido sugerido:**
- Dos conductores discutiendo frente a vehículos con daños menores.
- O una infografía de "$50k por incidente sin evidencia".
**Formato:** WebP o SVG.
**Prioridad:** Media.

---

## 3. HowItWorks Section (6 pasos)

**Ubicación:** `components/sections/HowItWorks.tsx`
**Tipo recomendado:** 6 screenshots o ilustraciones de la app.
**Contenido sugerido por paso:**
1. **Auto-Inicio:** Notificación "DuoVial detectó que estás conduciendo".
2. **Modo Vigilante:** Screenshot de `MonitorScreen` con preview y telemetría.
3. **Anti-Somnolencia 3 Niveles:** Visual de los 3 niveles de escalada.
4. **Detección de eventos:** Botón de pánico + medidor G-Force + colisión.
5. **Capa Fleet:** Geofencing + Facial + OBD II.
6. **Offline + Limpieza:** Indicador de sincronización pendiente.
**Formato:** WebP con bordes redondeados.
**Prioridad:** Alta.

---

## 4. TechSpecs Section (6 tabs)

**Ubicación:** `components/sections/TechSpecs.tsx`
**Tipo recomendado:** Diagrama de arquitectura general.
**Contenido sugerido:**
- Diagrama: App Móvil → Firebase → AWS S3 → Dashboard Web → Twilio.
**Formato:** SVG.
**Prioridad:** Media.

---

## 5. FatigueLevelsSection (Anti-Somnolencia 3 Niveles)

**Ubicación:** `components/sections/FatigueLevelsSection.tsx`
**Tipo recomendado:** Ilustraciones por nivel.
**Contenido sugerido:**
- Nivel 1 🟢: Icono de playlist + gasolinera + A/C.
- Nivel 2 🟡: Pantalla roja + conductor alerta.
- Nivel 3 🔴: SMS con mapa de ubicación.
**Formato:** SVG o iconos.
**Prioridad:** Baja — los emojis y textos funcionan bien.

---

## 6. DashboardFleetSection (Mockup Dashboard Web)

**Ubicación:** `components/sections/DashboardFleetSection.tsx`
**Espacio reservado:** El mapa simulado y los vehículos mock son placeholders funcionales.
**Tipo recomendado:** Screenshot real del Dashboard web (cuando esté desarrollado).
**Contenido sugerido:**
- Captura del dashboard con mapa en vivo, lista de vehículos y toggles.
**Formato:** WebP o PNG full-width.
**Prioridad:** Alta — reemplazaría el mockup actual por una imagen real.

---

## 7. Pricing Section (4 planes)

**Ubicación:** `components/sections/Pricing.tsx`
**Tipo recomendado:** Badge de Google Play + iconos de pago.
**Contenido sugerido:**
- Badge oficial "Disponible en Google Play".
- QR para descarga directa del APK.
**Formato:** SVG + PNG.
**Prioridad:** Media.

---

## 8. Testimonials Section

**Ubicación:** `components/sections/Testimonials.tsx`
**Tipo recomendado:** Fotos reales de conductores (con permiso) o avatares generados.
**Contenido sugerido:**
- 4 fotos de rostros reales de conductores.
- Diversidad de género y edad para reflejar los segmentos (Uber, reparto, flota).
**Formato:** WebP cuadrado, 200×200px.
**Prioridad:** Media.

---

## 9. Footer / CTA Final

**Ubicación:** `components/sections/Footer.tsx`
**Tipo recomendado:** Badge de Google Play + QR.
**Contenido sugerido:**
- Botón "Disponible en Google Play" oficial.
- QR que apunte al listing de Play Store.
**Formato:** SVG + PNG.
**Prioridad:** Alta.

---

## 📋 Checklist de Assets

- [ ] Video/imagen del Hero (teléfono en parabrisas)
- [ ] Ilustración de ProblemSection
- [ ] 6 screenshots de la app para HowItWorks
- [ ] Diagrama de arquitectura para TechSpecs
- [ ] Screenshot real del Dashboard Fleet
- [ ] Badge Google Play + QR para Footer/Pricing
- [ ] Fotos/avatars para Testimonials

---

## 💾 Ubicación recomendada para assets

```
landing-page/
├── public/
│   ├── hero-video.mp4
│   ├── hero-poster.webp
│   ├── problem-illustration.webp
│   ├── how-it-works/
│   │   ├── step-1-auto-inicio.webp
│   │   ├── step-2-vigilante.webp
│   │   ├── step-3-fatiga.webp
│   │   ├── step-4-eventos.webp
│   │   ├── step-5-fleet.webp
│   │   └── step-6-offline.webp
│   ├── architecture-diagram.svg
│   ├── dashboard-fleet-screenshot.webp
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
