import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorks from "@/components/sections/HowItWorks";
import TechSpecs from "@/components/sections/TechSpecs";
import FatigueLevelsSection from "@/components/sections/FatigueLevelsSection";
import DashboardFleetSection from "@/components/sections/DashboardFleetSection";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CosmicTrails from "@/components/ui/CosmicTrails";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#070F18]">
      <CosmicTrails />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <TechSpecs />
      <FatigueLevelsSection />
      <DashboardFleetSection />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  );
}
