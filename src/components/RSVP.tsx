"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function RSVP() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section id="rsvp" className="py-24 md:py-40 px-6 bg-vintage-bg">
      <div className="container mx-auto max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="border border-vintage-ink/20 p-8 md:p-16 relative"
        >
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-vintage-ink/30" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-vintage-ink/30" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-vintage-ink/30" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-vintage-ink/30" />

          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-vintage-ink mb-4">R. S. V. P.</h2>
            <p className="font-serif italic text-vintage-ink/70">Kindly reply by the 1st of August</p>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-10"
            >
              <h3 className="font-serif text-3xl mb-2 text-vintage-ink italic">Thank You</h3>
              <p className="font-jetbrains text-xs tracking-widest uppercase text-vintage-ink/70">Your response has been recorded</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 font-serif">
              <div>
                <label className="block text-vintage-ink uppercase tracking-[0.2em] text-xs font-jetbrains mb-2">Name(s)</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-transparent border-b border-vintage-ink/30 py-2 focus:outline-none focus:border-vintage-ink text-vintage-ink transition-colors"
                  placeholder="M..................................."
                />
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 mt-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 border border-vintage-ink/30 rounded flex items-center justify-center group-hover:border-vintage-ink transition-colors">
                    <input type="radio" name="attending" value="yes" required className="appearance-none w-3 h-3 checked:bg-vintage-ink rounded-sm" />
                  </div>
                  <span className="text-vintage-ink/90 text-lg italic">Joyfully Accepts</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 border border-vintage-ink/30 rounded flex items-center justify-center group-hover:border-vintage-ink transition-colors">
                    <input type="radio" name="attending" value="no" required className="appearance-none w-3 h-3 checked:bg-vintage-ink rounded-sm" />
                  </div>
                  <span className="text-vintage-ink/90 text-lg italic">Regretfully Declines</span>
                </label>
              </div>
              
              <div className="pt-8 text-center">
                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="bg-transparent text-vintage-ink border border-vintage-ink px-10 py-3 font-jetbrains uppercase tracking-[0.2em] text-xs hover:bg-vintage-ink hover:text-vintage-bg transition-all duration-300 disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
