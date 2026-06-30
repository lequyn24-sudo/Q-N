"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Gallery() {
  const images = [
    { src: "/images/gallery-1.png", alt: "Details 1", style: "col-span-12 md:col-span-7 aspect-[4/3]" },
    { src: "/images/gallery-1.png", alt: "Details 2", style: "col-span-6 md:col-span-5 aspect-[3/4] md:mt-24" },
    { src: "/images/gallery-1.png", alt: "Details 3", style: "col-span-6 md:col-span-4 aspect-[3/4]" },
    { src: "/images/gallery-1.png", alt: "Details 4", style: "col-span-12 md:col-span-8 aspect-video md:mt-12" },
  ];

  return (
    <section id="gallery" className="py-20 md:py-32 px-6 bg-retro-cream">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-serif text-5xl text-retro-ink mb-4">Moments</h2>
          <p className="text-sm tracking-widest uppercase text-retro-brown/60">A Glimpse Into Our Journey</p>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-12">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className={`relative overflow-hidden group ${img.style}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
