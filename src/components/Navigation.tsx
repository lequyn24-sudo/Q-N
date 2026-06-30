"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    if (latest > previous && latest > 150 && !menuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const links = [
    { name: "Story", href: "#story" },
    { name: "Gallery", href: "#gallery" },
    { name: "Details", href: "#details" },
    { name: "RSVP", href: "#rsvp" },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
          scrolled || menuOpen ? "bg-retro-brown/95 backdrop-blur-md shadow-sm py-4 text-retro-cream" : "bg-transparent py-6 text-retro-brown"
        )}
      >
        <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
          <a href="#" onClick={() => setMenuOpen(false)} className="font-serif text-xl md:text-2xl tracking-widest uppercase relative z-50 text-inherit">
            Quyn <span className="text-retro-gold mx-1">&amp;</span> Nhàn
          </a>
          
          <ul className="hidden md:flex gap-10">
            {links.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className="text-sm tracking-widest uppercase hover:text-retro-gold transition-colors duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <button 
            className="md:hidden relative z-50 p-2 -mr-2 text-inherit"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-20%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-20%" }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 bg-retro-brown flex flex-col items-center justify-center pt-20"
          >
            <ul className="flex flex-col items-center gap-12">
              {links.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <a 
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-4xl tracking-widest uppercase text-retro-cream hover:text-retro-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
