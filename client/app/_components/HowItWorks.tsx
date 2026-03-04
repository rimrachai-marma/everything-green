export default function HowItWorks() {
  const steps = [
    {
      n: "Step 1",
      // eslint-disable-next-line @next/next/no-img-element
      icon: <img src="/Mask group.png" alt="icon" />,
      label: "Add The Extension From The Chrome Web Store.",
    },
    {
      n: "Step 2",
      // eslint-disable-next-line @next/next/no-img-element
      icon: <img src="/Mask group2.png" alt="icon" />,
      label: "Navigate To Any Website You Want To Analyze.",
    },
    {
      n: "Step 3",
      // eslint-disable-next-line @next/next/no-img-element
      icon: <img src="/Mask group3.png" alt="icon" />,
      label: "Click The Extension Icon To See All SEO Data Magically Overlay The Page.",
    },
  ];

  return (
    <section>
      <h2 className="font-manrope font-extrabold text-[38px] sm:text-[44px] text-[#171717] text-center py-20">
        How It Works
      </h2>

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative items-start">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col gap-3 items-center">
                <div className="mb-6 font-inter font-medium text-[13px] text-[#595959] bg-white border border-gray-200 rounded-xl px-5 py-5 shadow-sx">
                  {step.n}
                </div>

                {/* Icon circle */}
                <div className="">{step.icon}</div>

                {/* Label */}
                <p className="font-inter text-center text-[15px] text-[#595959] leading-relaxed max-w-66">
                  {step.label}
                </p>
              </div>
            ))}
          </div>

          <svg
            className="hidden md:block absolute -top-16 left-1/2 transform -translate-x-1/2 w-180 -z-10"
            width="1058"
            height="192"
            viewBox="0 0 1058 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.00022 134.145C76.4647 11.8866 323.751 -62.429 523.641 74.6965C727.81 236.425 904.879 220.585 1056.27 74.8248"
              stroke="#1C9876"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="2 10"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
