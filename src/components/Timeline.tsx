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
    <section id="details" className="py-20 md:py-32 px-6 bg-[#1a1a1a] text-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-serif text-5xl text-center mb-16 md:mb-24">
          The <span className="italic text-[#c4b5a2]">Itinerary</span>
        </h2>
        
        <div className="relative border-l border-[#c4b5a2]/30 md:border-none space-y-16 md:space-y-24">
          {/* Center line for desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#c4b5a2]/30 -translate-x-1/2" />

          {events.map((event, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative pl-8 md:pl-0 flex flex-col md:flex-row md:items-center"
            >
              {/* Dot */}
              <div className="absolute w-3 h-3 bg-[#c4b5a2] rounded-full -left-[6px] md:left-1/2 md:-translate-x-[6px] top-2 md:top-1/2 md:-translate-y-1/2 z-10" />
              
              {/* Left side text (for even index on desktop) */}
              <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:hidden'}`}>
                {i % 2 === 0 && (
                  <>
                    <p className="font-serif text-2xl text-[#c4b5a2] mb-2">{event.time}</p>
                    <h3 className="text-xl tracking-wide uppercase mb-4">{event.title}</h3>
                    <p className="text-gray-400 font-light leading-relaxed">{event.desc}</p>
                  </>
                )}
              </div>

              {/* Right side text (for odd index on desktop, and all items on mobile) */}
              <div className={`md:w-1/2 ${i % 2 !== 0 ? 'md:pl-16' : 'md:hidden'}`}>
                {i % 2 !== 0 && (
                  <>
                    <p className="font-serif text-2xl text-[#c4b5a2] mb-2">{event.time}</p>
                    <h3 className="text-xl tracking-wide uppercase mb-4">{event.title}</h3>
                    <p className="text-gray-400 font-light leading-relaxed">{event.desc}</p>
                  </>
                )}
              </div>

              {/* Mobile text container */}
              <div className="md:hidden">
                <p className="font-serif text-2xl text-[#c4b5a2] mb-2">{event.time}</p>
                <h3 className="text-xl tracking-wide uppercase mb-4">{event.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{event.desc}</p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
