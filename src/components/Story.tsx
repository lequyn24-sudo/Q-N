"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Story() {
  return (
    <section id="story" className="py-24 md:py-40 px-6 bg-vintage-bg overflow-hidden relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-center">
          
          {/* Overlapping Images (Vintage Fine Art style) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-1/2 relative min-h-[500px]"
          >
            <div className="absolute top-0 left-0 w-3/4 h-[400px] border border-vintage-ink/10 p-2 grayscale-[30%] sepia-[15%]">
              <Image src="/images/gallery-1.png" alt="Story" fill className="object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-[300px] border border-vintage-ink/10 p-2 grayscale-[40%] sepia-[20%] translate-y-12">
              <Image src="/images/gallery-2.png" alt="Story" fill className="object-cover" />
            </div>
          </motion.div>
          
          {/* Typography */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-1/2 space-y-8"
          >
            <div>
              <p className="font-jetbrains text-xs tracking-[0.2em] uppercase text-vintage-ink/50 mb-4">Chapter I</p>
              <h2 className="font-serif text-5xl md:text-7xl text-vintage-ink leading-tight">
                How We <br/>
                <span className="italic opacity-80">Met</span>
              </h2>
            </div>
            
            <div className="space-y-6 font-serif text-lg md:text-xl font-light leading-relaxed text-vintage-ink/80 text-justify">
              <p>
                It began with a chance encounter in a crowded café on a rainy Tuesday. What started as a shared table quickly became a shared life. Over the past five years, we have built a life filled with laughter, adventure, and an enduring love.
              </p>
              <p>
                From our first trip to the Amalfi Coast to the quiet Sunday mornings in our apartment, every moment has been a testament to our bond. We are thrilled to invite you to celebrate the next chapter of our story.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
