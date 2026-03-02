import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[url('/bgfooter.png')] bg-cover bg-center bg-no-repeat pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1 space-y-8">
            <Image width={123} height={36} src="/logo.png" alt="Everything Green Logo" />
            <p className="font-inter text-[13px] text-[#595959] leading-relaxed">
              Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.
            </p>
          </div>

          {[
            { title: "Solutions", links: ["Web Tool", "Consulting", "Research"] },
            { title: "Company", links: ["About", "Methodology", "Partners"] },
            { title: "Community", links: ["Blog", "Events", "Open-Source Data"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-manrope font-bold text-[14px] text-[#171717] mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="font-inter text-[14px] text-[#595959] hover:text-[#1C9876] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[13px] text-[#595959]">
            Copyright &copy; {new Date().getFullYear()} everythinggreen. All Rights Reserved
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="size-12 rounded-full border border-gray-200 flex items-center justify-center text-[11px] text-[#595959] hover:border-[#1C9876] hover:text-[#1C9876] transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 3C9.03603 3 14.6389 3.0015 16.043 3.38574C16.8137 3.59342 17.4213 4.20087 17.6289 4.97168C18.0145 6.38012 18 9.31641 18 9.31641C18 9.33769 17.9982 12.2421 17.6289 13.6455C17.4213 14.4164 16.814 15.0249 16.043 15.2324C14.6365 15.6027 9.01668 15.6025 9 15.6025C9 15.6025 3.3803 15.6033 1.95703 15.2178C1.186 15.0101 0.578752 14.4018 0.371094 13.6309C0.00261305 12.2453 1.26186e-05 9.33576 0 9.30176C0 9.30176 0.000444037 6.38012 0.371094 4.97168C0.578707 4.20096 1.2011 3.57859 1.95703 3.37109C3.36561 3.00031 9 3 9 3ZM7.20605 12L11.8916 9.30176L7.20605 6.60352V12Z"
                  fill="#717171"
                />
              </svg>
            </Link>
            <Link
              href="#"
              className="size-12 rounded-full border border-gray-200 flex items-center justify-center text-[11px] text-[#595959] hover:border-[#1C9876] hover:text-[#1C9876] transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.9955 18.0002V17.9994H18V11.3979C18 8.16841 17.3047 5.68066 13.5292 5.68066C11.7142 5.68066 10.4962 6.67666 9.99896 7.62091H9.94646V5.98216H6.3667V17.9994H10.0942V12.0489C10.0942 10.4822 10.3912 8.96716 12.3315 8.96716C14.2432 8.96716 14.2717 10.7552 14.2717 12.1494V18.0002H17.9955Z"
                  fill="#717171"
                />
                <path d="M0.296875 5.98291H4.02888V18.0002H0.296875V5.98291Z" fill="#717171" />
                <path
                  d="M2.1615 0C0.96825 0 0 0.96825 0 2.1615C0 3.35475 0.96825 4.34325 2.1615 4.34325C3.35475 4.34325 4.323 3.35475 4.323 2.1615C4.32225 0.96825 3.354 0 2.1615 0V0Z"
                  fill="#717171"
                />
              </svg>
            </Link>
            <Link
              href="#"
              className="size-12 rounded-full border border-gray-200 flex items-center justify-center text-[11px] text-[#595959] hover:border-[#1C9876] hover:text-[#1C9876] transition-all"
            >
              <Image width={29} height={16} src="/medium.png" alt="Medium" />
            </Link>
            <Link
              href="#"
              className="size-12 rounded-full border border-gray-200 flex items-center justify-center text-[11px] text-[#595959] hover:border-[#1C9876] hover:text-[#1C9876] transition-all"
            >
              <Image width={24} height={26} src="/image 129.png" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
