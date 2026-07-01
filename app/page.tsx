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

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-night">
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
