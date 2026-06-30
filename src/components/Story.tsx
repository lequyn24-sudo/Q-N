"use client";

import { motion } from "framer-motion";

export default function Story() {
  return (
    <section id="story" className="py-20 md:py-48 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/3"
          >
            <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a]">
              Our<br/><span className="italic text-[#c4b5a2]">Story</span>
            </h2>
            <div className="w-12 h-[1px] bg-[#1a1a1a] mt-8" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-2/3 space-y-8 text-xl md:text-2xl font-light leading-relaxed text-gray-600"
          >
            <p>
              It began with a chance encounter in a crowded café on a rainy Tuesday. What started as a shared table quickly became a shared life. Over the past five years, we have built a life filled with laughter, adventure, and an enduring love.
            </p>
            <p>
              From our first trip to the Amalfi Coast to the quiet Sunday mornings in our apartment, every moment has been a testament to our bond. We are thrilled to invite you to celebrate the next chapter of our story.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
