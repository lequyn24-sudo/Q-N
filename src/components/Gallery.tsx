"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-40 bg-vintage-bg relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[90rem]">
        
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-32">
          <div className="mb-8 md:mb-0">
            <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-vintage-olive mb-4">Chương II — Kỷ Niệm</p>
            <h2 className="font-serif text-[4rem] md:text-[7rem] lg:text-[7.5rem] text-vintage-ink leading-[0.85] tracking-tight">
              Lưu Giữ <br/>
              <span className="italic text-vintage-soft-brown ml-12 md:ml-32">Khoảnh Khắc</span>
            </h2>
          </div>
          <div className="max-w-sm text-right">
            <p className="font-serif text-lg md:text-xl text-vintage-ink/70 leading-relaxed italic">
              "Những khoảnh khắc vô giá được lưu giữ trọn vẹn trên chặng đường chúng mình đi cùng nhau."
            </p>
          </div>
        </div>

        {/* Asymmetrical Collage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-8 relative min-h-[120vh]">
          
          {/* Image 1: Tall Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="md:col-span-5 lg:col-span-4 md:col-start-2 relative aspect-[3/4] md:translate-y-24 bg-vintage-ivory p-3 shadow-2xl -rotate-2 z-10"
          >
            <div className="w-full h-full relative overflow-hidden">
              <Image src="/images/gallery-1.png" alt="Gallery 1" fill className="object-cover grayscale-[50%] sepia-[20%] contrast-110" />
            </div>
            <div className="absolute -bottom-10 -right-10 font-script text-4xl text-vintage-sepia/60 -rotate-6">Nụ Cười</div>
          </motion.div>

          {/* Image 2: Wide Landscape */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="md:col-span-8 lg:col-span-7 md:col-start-6 lg:col-start-6 relative aspect-[16/9] bg-vintage-warm-white p-2 shadow-xl rotate-1 z-20 mt-16 md:mt-0"
          >
            <div className="w-full h-full relative overflow-hidden">
              <Image src="/images/gallery-2.png" alt="Gallery 2" fill className="object-cover grayscale-[40%] sepia-[30%] contrast-105" />
            </div>
          </motion.div>

          {/* Image 3: Small Square offset */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
            className="md:col-span-6 lg:col-span-4 md:col-start-7 lg:col-start-8 relative aspect-square bg-vintage-cream p-4 shadow-2xl rotate-3 z-30 mt-12 md:-mt-32 ml-auto w-3/4 md:w-full"
          >
            <div className="w-full h-full relative overflow-hidden">
              <Image src="/images/gallery-3.png" alt="Gallery 3" fill className="object-cover grayscale-[60%] sepia-[25%] contrast-110" />
            </div>
          </motion.div>
          
          {/* Decorative Large Type in background */}
          <div className="absolute bottom-[10%] left-0 w-full text-center pointer-events-none z-0 overflow-hidden">
             <h3 className="font-serif text-[15vw] text-vintage-ink/5 leading-none whitespace-nowrap opacity-30 select-none">
               Vẻ Đẹp Vượt Thời Gian
             </h3>
          </div>

        </div>
      </div>
    </section>
  );
}
