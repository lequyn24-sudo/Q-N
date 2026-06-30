"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WeddingDetails() {
  return (
    <section className="py-24 md:py-40 px-6 bg-vintage-bg text-vintage-ink overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 md:mb-24">
          <p className="font-jetbrains text-xs tracking-[0.2em] uppercase text-vintage-ink/50 mb-4">Location</p>
          <h2 className="font-serif text-5xl md:text-7xl">The Details</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-[4/5] border p-2 border-vintage-ink/20 grayscale-[20%] sepia-[10%]">
              <Image 
                src="/images/gallery-4.png" 
                alt="Venue" 
                fill 
                className="object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 space-y-12"
          >
            <div>
              <h3 className="font-serif text-3xl mb-4 italic">The Venue</h3>
              <p className="font-serif text-lg text-vintage-ink/80 leading-relaxed mb-4">
                The ceremony and reception will be held at the beautiful Malibu estate. 
                With sweeping ocean views and lush gardens, it is the perfect setting 
                to begin our lives together.
              </p>
              <address className="not-italic font-jetbrains text-sm uppercase tracking-widest text-vintage-ink/60 leading-loose">
                123 Ocean View Drive<br/>
                Malibu, California<br/>
                90265
              </address>
            </div>
            
            <div>
              <h3 className="font-serif text-3xl mb-4 italic">Dress Code</h3>
              <p className="font-serif text-lg text-vintage-ink/80 leading-relaxed">
                We kindly request formal attire. Think classic, elegant, and timeless.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-3xl mb-4 italic">Gifts</h3>
              <p className="font-serif text-lg text-vintage-ink/80 leading-relaxed">
                Your presence is the greatest gift. However, if you wish to honor us with a gift, a wishing well will be available at the reception.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
