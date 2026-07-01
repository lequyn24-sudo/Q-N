"use client";

import { motion } from "framer-motion";
import { Paperclip } from "lucide-react";

export default function Timeline() {
  return (
    <section id="details" className="relative py-24 md:py-40 px-6 bg-[#5C4D3C] text-vintage-ivory overflow-hidden min-h-screen flex items-center justify-center">
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center">
        
        {/* Editorial Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-script text-[4rem] md:text-[6rem] lg:text-[7rem] leading-none text-vintage-ivory capitalize">
            Ngày Trọng Đại Của Chúng Mình
          </h2>
        </motion.div>

        {/* Main Content Area */}
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 text-center md:text-left z-20 order-2 md:order-1"
          >
            <p className="font-jetbrains text-vintage-ivory/70 text-[10px] md:text-xs lg:text-sm tracking-[0.3em] uppercase">
              Ngày Chúng Mình
            </p>
          </motion.div>

          {/* Right Text */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 text-center md:text-right z-20 order-3 md:order-3"
          >
            <p className="font-jetbrains text-vintage-ivory/70 text-[10px] md:text-xs lg:text-sm tracking-[0.3em] uppercase">
              Chính Thức <br className="hidden md:block" />Về Chung Nhà
            </p>
          </motion.div>

          {/* Center Vintage Calendar Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
            className="relative bg-vintage-ivory w-72 md:w-80 lg:w-96 aspect-square shadow-2xl flex flex-col items-center justify-center text-vintage-ink p-8 order-1 md:order-2 z-10 border border-vintage-ink/5"
            style={{ boxShadow: '15px 25px 50px rgba(0, 0, 0, 0.5)' }}
          >
            {/* Paperclip */}
            <div className="absolute -top-6 left-6 text-vintage-ink/40 opacity-80 rotate-12 drop-shadow-sm">
              <svg width="24" height="64" viewBox="0 0 24 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C9.23858 2 7 4.23858 7 7V45C7 49.4183 10.5817 53 15 53C19.4183 53 23 49.4183 23 45V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M12 62C7.58172 62 4 58.4183 4 54V16C4 11.5817 7.58172 8 12 8C16.4183 8 20 11.5817 20 16V47" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            
            {/* Card inner subtle border/texture */}
            <div className="absolute inset-3 border border-vintage-ink/10 pointer-events-none" />

            <div className="text-center w-full mt-4">
              <p className="font-serif text-3xl md:text-4xl tracking-widest mb-2 text-vintage-ink/80">2026</p>
              <p className="font-serif text-2xl md:text-3xl tracking-[0.3em] uppercase border-b border-vintage-ink/20 pb-4 inline-block px-4 text-vintage-ink">
                Tháng 8
              </p>
            </div>

            <div className="relative mt-6 flex-grow flex items-center justify-center w-full">
              {/* Hand-drawn circle */}
              <svg className="absolute w-full h-full max-w-[200px] max-h-[200px] text-vintage-sepia opacity-60 -rotate-[15deg]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5C75 10 95 30 95 50C95 75 75 95 45 95C20 95 5 70 8 45C10 20 30 5 50 5Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              
              <span className="font-script text-[6rem] md:text-[8rem] text-vintage-burgundy italic leading-none z-10 -ml-2">
                8
              </span>
            </div>
            
          </motion.div>

        </div>

        {/* Lunar Date Info below */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="mt-20 text-center"
        >
          <p className="font-jetbrains font-bold text-vintage-ivory/70 text-[10px] md:text-xs tracking-[0.3em] uppercase">
            Tức Ngày 26 Tháng 8 Năm Bính Ngọ
          </p>
        </motion.div>

      </div>
    </section>
  );
}
