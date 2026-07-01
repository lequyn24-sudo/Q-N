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
        
        {/* Main Central Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          style={{ y: y1 }}
          className="relative w-full max-w-sm md:max-w-md lg:max-w-lg aspect-[3/4] z-20 mx-auto mt-4"
        >
          {/* The Actual Photo */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full [clip-path:ellipse(39%_30.5%_at_50%_51.5%)] bg-vintage-bg">
              <Image 
                src="/images/hero-lineart-916.png" 
                alt="Quyn & Nhàn" 
                fill 
                className="object-cover scale-[1.15] translate-y-[4%] object-center grayscale-[50%] sepia-[15%] contrast-110"
                priority
              />

              {/* Chữ & đặt lên TRÊN ảnh vì ảnh không trong suốt. Hạ opacity để không che mặt */}
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-[0.15]">
                <span className="font-bonthing text-[20rem] md:text-[30rem] leading-none text-vintage-ink translate-x-10 -translate-y-8 drop-shadow-sm">
                  &amp;
                </span>
              </div>
            </div>
          </div>

          {/* Embossed Lace Frame Image blended over the photo */}
          <div className="absolute inset-0 z-20 pointer-events-none mix-blend-multiply">
            <Image
              src="/images/lace-frame-v2.png"
              alt="Lace Frame"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Floating Typography - Top Center */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
          style={{ y: y2 }}
          className="absolute top-[14%] md:top-[16%] left-1/2 -translate-x-1/2 z-30 w-full text-center px-4"
        >
          <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-vintage-ink tracking-wide">
            Quyn Lê
          </h1>
        </motion.div>

        {/* Floating Typography - Bottom Center */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.7, ease: "easeOut" }}
          style={{ y: y2 }}
          className="absolute bottom-[16%] md:bottom-[14%] left-1/2 -translate-x-1/2 z-30 w-full text-center px-4"
        >
          <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-vintage-ink tracking-wide">
            Nhàn Bùi
          </h1>
        </motion.div>

      </motion.div>
    </section>
  );
}
