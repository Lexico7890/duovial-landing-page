import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorks from "@/components/sections/HowItWorks";
import TechSpecs from "@/components/sections/TechSpecs";
import DemoSimulatorSection from "@/components/sections/DemoSimulatorSection";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-night">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <TechSpecs />
      <DemoSimulatorSection />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  );
}
