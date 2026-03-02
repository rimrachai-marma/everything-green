"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is This Extension Free?",
    a: "Yes! The core version with key metrics is free. We offer a Pro plan with more in-depth data and historical trends.",
  },
  {
    q: "Which Browsers Do You Support?",
    a: "Currently Chrome, Brave, and Edge (Chromium-based). Firefox support coming soon.",
  },
  {
    q: "How Accurate Is The Data?",
    a: "Our data is sourced from multiple industry-leading SEO data providers and updated daily.",
  },
  {
    q: "What Are My Homeownership Program Obligations?",
    a: "We are committed to carbon-neutral digital infrastructure through green hosting partnerships.",
  },
  {
    q: "How Long Does The Homeownership Program Process Take?",
    a: "Getting started takes less than 30 seconds — just install and you're ready.",
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;
    wrapper.style.height = isOpen ? `${content.scrollHeight}px` : "0px";
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button className="w-full flex items-center gap-4 py-5 text-left group" onClick={onToggle}>
        <span className="font-inter text-[14px] text-[#9ca3af] w-7 shrink-0">{String(index + 1).padStart(2, "0")}</span>
        <span className="font-manrope font-bold text-[16px] text-[#171717] flex-1">{faq.q}</span>
        <span
          className="text-[#595959] shrink-0 inline-flex"
          style={{
            transition: "transform 300ms ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>

      <div
        ref={wrapperRef}
        style={{
          height: "0px",
          overflow: "hidden",
          transition: "height 320ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div ref={contentRef}>
          <div
            className="pb-5 pl-11 pr-6"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 280ms ease 40ms, transform 280ms ease 40ms",
            }}
          >
            <p className="font-inter text-[14px] text-[#595959] leading-relaxed">{faq.a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 className="font-manrope font-extrabold text-[38px] sm:text-[44px] text-[#171717] text-center mb-14">
          Frequently Asked Questions
        </h2>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
