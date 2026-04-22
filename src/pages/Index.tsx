import { Navigation } from "@/components/church/Navigation";
import { HeroSection } from "@/components/church/HeroSection";
import { AboutSection } from "@/components/church/AboutSection";
import { SermonsSection } from "@/components/church/SermonsSection";
import { EventsSection } from "@/components/church/EventsSection";
import { MinistriesSection } from "@/components/church/MinistriesSection";
import { TestimonialsSection } from "@/components/church/TestimonialsSection";
import { ContactSection } from "@/components/church/ContactSection";
import { Footer } from "@/components/church/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main>
      <HeroSection />
      <AboutSection />
      <SermonsSection />
      <EventsSection />
      <MinistriesSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default Index;
