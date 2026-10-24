import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { AboutPreview } from "@/components/home/AboutPreview";
import { SermonSection } from "@/components/home/SermonSection";
import { EventsSection } from "@/components/home/EventsSection";
import { MinistrySection } from "@/components/home/MinistrySection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <AboutPreview />
      <SermonSection />
      <EventsSection />
      <MinistrySection />
      <CTASection />
    </>
  );
}
