import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reeti Singh — Full-Stack Dev & Open-Source Advocate",
  description: "Portfolio of Reeti Singh. Full-Stack Developer, Open-Source Contributor at Wikimedia Foundation, and Community Leader. Building elegant systems that automate the boring stuff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <CustomCursor />
        <ParticleBackground />
        <ScrollProgress />
        <Navbar />
        <main className="pt-14 pb-20 px-6 md:px-12 max-w-6xl mx-auto min-h-screen flex flex-col relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
