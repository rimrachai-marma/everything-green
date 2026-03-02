import HowItWorks from "./_components/HowItWorks";
import TestimonialCarousel from "./_components/TestimonialCarousel";
import FAQSection from "./_components/FAQSection";
import Hero from "./_components/Hero";

export default async function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <div className="bg-[url('/bg-shape.png')] bg-no-repeat bg-left bg-contain">
        <HowItWorks />
        <TestimonialCarousel />
      </div>
      <FAQSection />
    </main>
  );
}
