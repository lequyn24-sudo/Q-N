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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={containerRef} className="pt-28 md:pt-32 pb-16 px-4 md:px-8 max-w-[1600px] mx-auto min-h-[100dvh] flex flex-col justify-center">
      <div className="text-center mb-10 md:mb-12">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase text-gray-500 mb-6"
        >
          The Wedding Celebration Of
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.7 }}
          className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] leading-none tracking-tight text-[#1a1a1a]"
        >
          Quyn <span className="text-[#c4b5a2] font-light italic">&amp;</span> Nhàn
        </motion.h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 3, ease: "easeOut" }}
        className="relative w-full aspect-video overflow-hidden bg-gray-100"
      >
        <motion.div style={{ y, height: "130%" }} className="absolute inset-0 -top-[15%]">
          <Image
            src="/images/hero.png"
            alt="Quyn & Nhàn Wedding"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1600px) 100vw, 1600px"
          />
        </motion.div>
      </motion.div>
      
      <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest uppercase text-gray-400">
        <p>September 12, 2026</p>
        <p className="hidden md:block">Scroll to Explore</p>
        <p>New York City</p>
      </div>
    </section>
  );
}
