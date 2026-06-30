"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function OpeningAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Disable scroll while opening animation is active
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "auto";
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-vintage-bg flex items-center justify-center overflow-hidden"
        >
          {/* Subtle noise background */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

          <div className="text-center relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-8"
            >
              {/* Using CSS masks or simple SVG for a wax seal/emblem look */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-vintage-ink/30 flex items-center justify-center p-2 relative">
                <div className="absolute inset-0 rounded-full border border-vintage-ink/10 animate-[spin_10s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
                <div className="w-full h-full rounded-full bg-vintage-ink/5 flex items-center justify-center">
                  <span className="font-serif text-3xl md:text-5xl text-vintage-ink italic">Q&N</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className="font-serif text-3xl md:text-5xl tracking-widest text-vintage-ink uppercase mb-4"
              >
                Save the Date
              </motion.h1>
            </motion.div>
            
            <motion.div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.33, 1, 0.68, 1] }}
                className="font-jetbrains text-xs md:text-sm tracking-[0.3em] uppercase text-vintage-ink/60"
              >
                A Vintage Dream
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
