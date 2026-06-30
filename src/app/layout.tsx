import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Playfair_Display, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";

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

const playfair = Playfair_Display({
  weight: ['400', '600', '700'],
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  style: ['normal', 'italic'],
});

const unifraktur = UnifrakturMaguntia({
  weight: ['400'],
  variable: "--font-unifraktur",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Wedding Post | Quyn & Nhàn",
  description: "Our story, itinerary, and RSVP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${playfair.variable} ${unifraktur.variable} h-full antialiased`}
    >
      <body className="h-full bg-newspaper-bg text-newspaper-ink overflow-hidden overscroll-none">
        {children}
      </body>
    </html>
  );
}
