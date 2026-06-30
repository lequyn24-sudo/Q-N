"use client";

import { motion } from "framer-motion";

export default function Timeline() {
  const events = [
    { time: "3:00 PM", title: "Welcome Drinks", desc: "Guests arrive and mingle with light refreshments.", period: "Afternoon" },
    { time: "4:00 PM", title: "Ceremony", desc: "The exchange of vows and rings.", period: "Late Afternoon" },
    { time: "5:30 PM", title: "Cocktail Hour", desc: "Signature drinks and hors d'oeuvres.", period: "Evening" },
    { time: "7:00 PM", title: "Reception", desc: "Dinner, toasts, and dancing into the night.", period: "Night" },
  ];

  return (
    <section id="details" className="relative py-24 md:py-40 px-6 bg-vintage-bg text-vintage-ink overflow-hidden">
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <p className="font-jetbrains text-xs tracking-[0.2em] uppercase text-vintage-ink/50 mb-4">Chapter III</p>
          <h2 className="font-serif text-5xl md:text-7xl">The Itinerary</h2>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-vintage-ink/20 -translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {events.map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-vintage-ink rounded-full -translate-x-[5px] md:-translate-x-1.5 mt-2 md:mt-0" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 w-full md:w-[45%] ${i % 2 === 0 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                  <p className="font-jetbrains text-xs uppercase tracking-widest text-vintage-ink/60 mb-2">{event.period}</p>
                  <p className="font-serif text-3xl mb-1">{event.time}</p>
                  <h3 className="font-serif italic text-2xl mb-3 text-vintage-ink/90">{event.title}</h3>
                  <p className="font-serif font-light text-vintage-ink/70 leading-relaxed text-lg">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
