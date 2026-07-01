import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Cormorant_Garamond, JetBrains_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  style: ['normal', 'italic'],
});

const jetbrains = JetBrains_Mono({
  weight: ['300', '400', '500'],
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const scriptFont = Dancing_Script({
  weight: ['400', '500', '600', '700'],
  variable: "--font-script",
  subsets: ["latin", "vietnamese"],
});

const bonthingFont = localFont({
  src: "../../public/fonts/Bonthing.ttf",
  variable: "--font-bonthing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quyn & Nhàn | Vintage Dream",
  description: "Our wedding celebration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable} ${scriptFont.variable} ${bonthingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-vintage-bg text-vintage-ink relative">
        {/* Global Vintage Texture Overlay */}
        <div 
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-multiply" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
