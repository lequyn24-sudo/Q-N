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
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#faf9f6]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-6xl tracking-widest text-[#1a1a1a]">
              Quyn <span className="text-[#c4b5a2] mx-2">&amp;</span> Nhàn
            </h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
              className="h-[1px] bg-[#1a1a1a] mt-6 w-full origin-center"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
