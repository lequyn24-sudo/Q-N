"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[100dvh] bg-retro-brown flex items-center justify-center p-4 md:p-8 overflow-hidden pt-20">
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Organic Shape / Parchment Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 2.2, ease: "easeOut" }}
        className="relative w-full max-w-5xl h-[80vh] md:h-[85vh] bg-retro-cream shadow-2xl rounded-[40px] md:rounded-[60px] flex flex-col justify-center overflow-hidden border border-retro-gold/30"
        style={{ opacity }}
      >
        {/* Subtle inner gold border */}
        <div className="absolute inset-4 md:inset-6 border border-retro-gold/30 rounded-[28px] md:rounded-[40px] pointer-events-none" />
        
        <div className="relative z-10 text-center px-4">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase text-retro-brown/70 mb-6 font-medium"
          >
            The Wedding Celebration Of
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.7 }}
            className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] leading-none tracking-tight text-retro-ink"
          >
            Quyn <span className="text-retro-gold font-light italic">&amp;</span> Nhàn
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
            className="mt-12 md:mt-16 flex items-center justify-center gap-4 text-retro-brown/80 uppercase tracking-widest text-xs md:text-sm font-medium"
          >
            <span>Sunday</span>
            <span className="w-1 h-1 bg-retro-gold rounded-full" />
            <span>June 15</span>
            <span className="w-1 h-1 bg-retro-gold rounded-full" />
            <span>2026</span>
          </motion.div>
        </div>

        {/* Decorative corner elements */}
        <svg className="absolute top-8 left-8 w-12 h-12 text-retro-gold/40 md:w-20 md:h-20 md:top-12 md:left-12 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
           <path d="M50 0 C50 50, 0 50, 0 50 C50 50, 50 100, 50 100 C50 50, 100 50, 100 50 C100 50, 50 0, 50 0 Z" />
        </svg>
        <svg className="absolute bottom-8 right-8 w-12 h-12 text-retro-gold/40 md:w-20 md:h-20 md:bottom-12 md:right-12 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
           <path d="M50 0 C50 50, 0 50, 0 50 C50 50, 50 100, 50 100 C50 50, 100 50, 100 50 C100 50, 50 0, 50 0 Z" />
        </svg>
      </motion.div>
    </section>
  );
}
