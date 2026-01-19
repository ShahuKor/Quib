import DemoSection from "@/components/Home /demo-section";
import { HeroSection } from "@/components/Home /hero-section";
import { Howitworks } from "@/components/Home /how-it-works";
import { PricingSection } from "@/components/Home /pricing";
import CTASection from "@/components/Home /cta-section";
export default function Home() {
  return (
    <div className="relative w-full">
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <Howitworks />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
}
