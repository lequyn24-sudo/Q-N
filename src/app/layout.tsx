import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono, Great_Vibes } from "next/font/google";
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

const greatVibes = Great_Vibes({
  weight: ['400'],
  variable: "--font-script",
  subsets: ["latin"],
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
      className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-vintage-bg text-vintage-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
