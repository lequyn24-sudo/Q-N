"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Gallery() {
  const images = [
    "/images/gallery-1.png",
    "/images/gallery-2.png",
    "/images/gallery-3.png",
  ];

  return (
    <section id="gallery" className="py-24 md:py-32 bg-vintage-bg relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 md:mb-24">
          <p className="font-jetbrains text-xs tracking-[0.2em] uppercase text-vintage-ink/50 mb-4">Chapter II</p>
          <h2 className="font-serif text-4xl md:text-6xl text-vintage-ink">Moments</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: idx * 0.2, ease: "easeOut" }}
              className={`relative w-full md:w-1/3 aspect-[3/4] p-2 grayscale-[30%] sepia-[15%] hover:grayscale-0 hover:sepia-0 transition-all duration-700 embossed-frame ${idx === 1 ? 'md:-translate-y-12' : ''}`}
            >
              <div className="w-full h-full relative overflow-hidden embossed-frame-inner">
                <Image 
                  src={src} 
                  alt={`Gallery ${idx + 1}`} 
                  fill 
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
