"use client";

import { motion } from "framer-motion";

export default function WeddingDetails() {
  const details = [
    {
      title: "Venue",
      content: "The Plaza Hotel\n768 5th Ave\nNew York, NY 10019",
    },
    {
      title: "Dress Code",
      content: "Black Tie Optional.\nWe ask that our guests wear\nmuted, elegant tones.",
    },
    {
      title: "Accommodations",
      content: "A block of rooms has been reserved.\nPlease mention the Quyn & Nhàn wedding\nwhen booking.",
    }
  ];

  return (
    <section className="py-20 md:py-40 px-6 bg-retro-cream">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {details.map((detail, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <h3 className="font-serif text-2xl mb-6 text-retro-ink">{detail.title}</h3>
              <p className="text-sm font-light text-retro-brown/70 leading-loose whitespace-pre-line">
                {detail.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
