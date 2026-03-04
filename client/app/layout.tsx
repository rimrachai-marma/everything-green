import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import "./globals.css";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getProfile } from "@/lib/actions/user";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Everything Green — Measuring Impact, Driving Change",
  description: "Your SEO Swiss Army Knife, Right In The Browser.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await getProfile();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} antialiased flex flex-col min-h-screen`}>
        <Navbar user={result.status === "success" ? result.data : null} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
