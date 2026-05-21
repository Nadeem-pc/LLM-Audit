import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ToolLogos } from "@/components/ToolLogos";
import { HowItWorks } from "@/components/HowItWorks";
import { SavingsPreview } from "@/components/SavingsPreview";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-brand-500/30">
      <Navbar />
      <Hero />
      <div className="relative">
        <ToolLogos />
        <HowItWorks />
        <SavingsPreview />
        <FeatureGrid />
        <Testimonials />
        <CallToAction />
      </div>
      <Footer />
    </main>
  );
}
