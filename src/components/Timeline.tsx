"use client";

import { motion } from "framer-motion";

export default function Timeline() {
  const events = [
    { time: "3:00 PM", title: "Welcome Drinks", desc: "Arrive early and enjoy a refreshment before the ceremony." },
    { time: "4:00 PM", title: "The Ceremony", desc: "Witness our exchange of vows in the main courtyard." },
    { time: "5:00 PM", title: "Cocktail Hour", desc: "Drinks, hors d'oeuvres, and live music on the terrace." },
    { time: "7:00 PM", title: "Dinner & Reception", desc: "Join us for a curated dining experience and dancing into the night." },
  ];

  return (
    <section id="details" className="relative py-20 md:py-32 px-6 bg-retro-brown text-retro-cream overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="font-serif text-5xl text-center mb-16 md:mb-24">
          The <span className="italic text-retro-gold">Itinerary</span>
        </h2>
        
        <div className="relative border-l border-retro-gold/30 md:border-none space-y-16 md:space-y-24">
          {/* Center line for desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-retro-gold/30 -translate-x-1/2" />

          {events.map((event, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className={`flex flex-col md:flex-row items-start md:items-center relative pl-8 md:pl-0 ${
                i % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 rounded-full bg-retro-gold md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 shadow-[0_0_10px_rgba(196,166,97,0.5)] z-10" />
              {/* Mobile and desktop text container */}
              <div className={`w-full md:w-[45%] ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                <p className="font-serif text-retro-gold text-2xl mb-2">{event.time}</p>
                <h3 className="font-serif text-2xl mb-3">{event.title}</h3>
                <p className="text-sm font-light text-retro-cream/70 leading-relaxed">
                  {event.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
