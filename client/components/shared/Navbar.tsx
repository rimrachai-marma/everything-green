"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X, LogOut, ChevronDown, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User } from "@/types";
import { logout } from "@/lib/actions/auth";

interface Props {
  user?: User | null;
}
const Navbar: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, startTransition] = React.useTransition();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-17.5 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" className="h-12" alt="Everything Green Logo" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Services", "Blog", "Contact Us"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `#${item.toLowerCase().replace(" ", "-")}`}
              className="font-inter font-medium text-[15px] text-[#171717] hover:text-primary transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="text-sm sm:text-base">
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-44 p-1.5 rounded-xl shadow-lg" align="end">
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[14px] font-inter font-medium text-[#171717] hover:bg-gray-100 transition-colors"
                >
                  <UserIcon size={15} className="text-gray-500" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    startTransition(() => {
                      logout();
                    });
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[14px] font-inter font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={15} />
                  <span>{isLoading ? "Loging out..." : "Log out"}</span>
                </button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link
              href="/auth/login"
              className="border-2 border-primary text-[#171717] font-manrope font-bold text-[14px] px-7 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <Button size="icon" variant="outline" className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {["Home", "Services", "Blog", "Contact Us"].map((item) => (
            <Link key={item} href="#" className="block py-2 font-inter text-[15px] text-[#171717]">
              {item}
            </Link>
          ))}

          {user ? (
            <>
              <div className="flex items-center gap-2.5 py-2 border-t border-gray-100 mt-2 pt-4">
                <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-[12px] font-bold">
                  {user.firstName.charAt(0)}
                </span>
                <span className="font-manrope font-bold text-[14px] text-[#171717]">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <Link href="/profile" className="flex items-center gap-2.5 py-2 font-inter text-[15px] text-[#171717]">
                <UserIcon size={16} className="text-gray-500" />
                Profile
              </Link>
              <button
                onClick={() => {
                  React.startTransition(() => {
                    logout();
                  });
                }}
                className="flex items-center gap-2.5 py-2 font-inter text-[15px] text-red-500 w-full"
              >
                <LogOut size={16} />
                <span>{isLoading ? "Loging out..." : "Log out"}</span>
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="block border-2 border-primary text-center font-manrope font-bold text-[14px] px-5 py-2.5 rounded-full mt-3 hover:bg-primary hover:text-white transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
