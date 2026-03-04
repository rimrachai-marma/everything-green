"use client";

import { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Jhon Stokes",
    role: "Founder",
    image: "/user1.png",
    text: "I have been taking gym and fitness training here since a long time and I found here so much easy, comfort and flexibility. The mentors are so good and they train me very well.",
  },
  {
    name: "Jane Doe",
    role: "Head of SEO at ABC Agency.",
    image: "/user2.png",
    text: "I have been taking gym and fitness training here since a long time and I found here so much easy, comfort and flexibility. The mentors are so good and they train me very well.",
  },
  {
    name: "Mark Wilson",
    role: "Digital Marketing Lead",
    image: "/user1.png",
    text: "I have been taking gym and fitness training here since a long time and I found here so much easy, comfort and flexibility. The mentors are so good and they train me very well.",
  },
  {
    name: "Emily Davis",
    role: "SEO Specialist",
    image: "/user2.png",
    text: "I have been taking gym and fitness training here since a long time and I found here so much easy, comfort and flexibility. The mentors are so good and they train me very well.",
  },
];

function TestimonialCard({ item }: { item: (typeof testimonials)[0] }) {
  return (
    <div className="flex gap-12 flex-col h-full">
      {/* Card */}
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-10 space-y-2">
        <div className="flex items-center gap-2 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              className="size-6"
              key={i}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4125 17.8781L17.1375 20.8781C17.7469 21.2625 18.4969 20.6906 18.3187 19.9875L16.95 14.6063C16.913 14.4571 16.9189 14.3005 16.967 14.1546C17.0151 14.0086 17.1034 13.8792 17.2219 13.7813L21.4594 10.2469C22.0125 9.78752 21.7312 8.8594 21.0094 8.81252L15.4781 8.45627C15.3272 8.44749 15.1821 8.39494 15.0606 8.30503C14.939 8.21513 14.8463 8.09177 14.7937 7.95002L12.7312 2.75627C12.6767 2.60618 12.5772 2.47653 12.4464 2.38491C12.3156 2.29329 12.1597 2.24414 12 2.24414C11.8403 2.24414 11.6844 2.29329 11.5536 2.38491C11.4228 2.47653 11.3233 2.60618 11.2687 2.75627L9.20625 7.95002C9.15368 8.09177 9.06096 8.21513 8.93943 8.30503C8.81789 8.39494 8.67279 8.44749 8.52187 8.45627L2.99062 8.81252C2.26875 8.8594 1.9875 9.78752 2.54062 10.2469L6.77812 13.7813C6.89656 13.8792 6.98492 14.0086 7.03302 14.1546C7.08112 14.3005 7.08701 14.4571 7.05 14.6063L5.78437 19.5938C5.56875 20.4375 6.46875 21.1219 7.19062 20.6625L11.5875 17.8781C11.7108 17.7997 11.8539 17.7581 12 17.7581C12.1461 17.7581 12.2892 17.7997 12.4125 17.8781V17.8781Z"
                stroke="#1C9876"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ))}
        </div>

        <p className="text-gray-500 text-sm leading-relaxed text-left">{item.text}</p>

        <div className="flex justify-end">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.2221 30.5885V24.8434C18.2221 24.0639 18.8093 23.4325 19.5333 23.4325C22.1169 23.4325 23.5224 20.5816 23.7174 14.9537H19.5333C18.8094 14.9537 18.2221 14.3214 18.2221 13.5428V1.41178C18.2221 0.632555 18.8093 0.00118364 19.5333 0.00118364H30.6887C31.4125 0.00118364 32 0.633245 32 1.41178V13.5429C32 16.2405 31.7469 18.716 31.25 20.9022C30.7396 23.1434 29.9561 25.1029 28.9218 26.7266C27.8581 28.3952 26.5263 29.7046 24.9658 30.6165C23.3935 31.5342 21.5657 32 19.5328 32C18.8094 31.9994 18.2221 31.3674 18.2221 30.5885ZM1.31097 23.4321C0.587055 23.4321 0 24.0639 0 24.8424V30.5886C0 31.3674 0.587055 31.9989 1.31097 31.9989C3.34293 31.9989 5.17157 31.5331 6.74288 30.6154C8.30421 29.7036 9.63581 28.3953 10.6995 26.7255C11.7344 25.1018 12.5178 23.1423 13.0282 20.9C13.5254 18.7137 13.7779 16.2381 13.7779 13.5417V1.4106C13.7779 0.631371 13.1903 0 12.4667 0H1.31097C0.587055 0 0 0.631963 0 1.4106V13.5417C0 14.3208 0.587055 14.9526 1.31097 14.9526H5.43631C5.24362 20.581 3.85839 23.4321 1.31097 23.4321Z"
              fill="#0BBE64"
              fillOpacity="0.38"
            />
          </svg>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-6 px-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
        <div className="flex flex-col items-start">
          <h4 className="text-base font-semibold text-gray-800">{item.name}</h4>
          <p className="text-gray-400 text-sm">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="font-manrope font-extrabold text-[38px] sm:text-[44px] text-[#171717] text-center mb-14">
          Loved By SEOs And Marketers
        </h2>

        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          plugins={[plugin.current]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-6">
            {testimonials.map((item, index) => (
              <CarouselItem key={index} className="pl-6 basis-full md:basis-1/2">
                <TestimonialCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* ACTION BUTTONs  */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-2 rounded-sm transition-all duration-300 ${
                i === current ? "w-10 bg-[#4ECBA3]" : "w-6 bg-[#4ECBA3]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
