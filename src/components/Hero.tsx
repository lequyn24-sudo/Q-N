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

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[100dvh] bg-vintage-bg flex items-center justify-center overflow-hidden">
      
      {/* Background Noise for Vintage Feel */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <motion.div style={{ opacity }} className="relative w-full max-w-7xl mx-auto h-[90vh] flex items-center justify-center">
        
        {/* Main Central Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 2.2, ease: "easeOut" }}
          style={{ y: y1 }}
          className="relative w-[80%] md:w-[45%] lg:w-[40%] aspect-[3/4] md:aspect-[4/5] z-10 floral-lace-wrapper max-h-[80vh]"
        >
          <div className="floral-lace-frame w-full h-full relative overflow-hidden grayscale-[50%] sepia-[10%] contrast-110">
            <div className="absolute inset-0 z-10 floral-lace-inner pointer-events-none" />
            <Image 
              src="/images/hero.png" 
              alt="Quyn & Nhàn" 
              fill 
              className="object-cover object-top"
              priority
            />
          </div>
        </motion.div>

        {/* Floating Typography - Top Left */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
          style={{ y: y2 }}
          className="absolute top-[8%] md:top-[25%] left-[8%] md:left-[5%] lg:left-[8%] z-20"
        >
          <h1 className="font-serif text-[4rem] md:text-6xl lg:text-7xl leading-none tracking-tight text-vintage-ink drop-shadow-sm whitespace-nowrap">
            Quyn
          </h1>
          <p className="font-jetbrains text-[10px] md:text-xs tracking-widest uppercase mt-4 md:ml-2 text-vintage-ink/60">
            The groom
          </p>
        </motion.div>

        {/* Floating Typography - Bottom Right */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 2.7, ease: "easeOut" }}
          style={{ y: y2 }}
          className="absolute bottom-[10%] md:bottom-[25%] right-[8%] md:right-[5%] lg:right-[8%] z-20 text-right"
        >
          <h1 className="font-serif text-[4rem] md:text-6xl lg:text-7xl leading-none tracking-tight text-vintage-ink drop-shadow-sm whitespace-nowrap">
            &amp; Nhàn
          </h1>
          <p className="font-jetbrains text-[10px] md:text-xs tracking-widest uppercase mt-4 md:mr-2 text-vintage-ink/60">
            The bride
          </p>
        </motion.div>

        {/* Central Small Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center font-jetbrains text-[10px] md:text-xs uppercase tracking-[0.3em] text-vintage-ink/80"
        >
          A Vintage Dream <br/> 06 . 15 . 2026
        </motion.div>

      </motion.div>
    </section>
  );
}
