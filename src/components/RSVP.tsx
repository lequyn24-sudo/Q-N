"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

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
    <section id="rsvp" className="py-20 md:py-32 px-6 bg-[#faf9f6]">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-5xl text-[#1a1a1a] mb-6">RSVP</h2>
        <p className="text-gray-500 font-light mb-12 md:mb-16">
          Kindly respond by August 1st, 2026.
        </p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 md:p-12 rounded-sm shadow-sm flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-[#c4b5a2]/20 rounded-full flex items-center justify-center mb-6">
              <Check className="text-[#c4b5a2] w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl mb-2 text-[#1a1a1a]">Thank You</h3>
            <p className="text-gray-500 font-light">Your response has been recorded.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-8 bg-white p-6 md:p-12 shadow-sm rounded-sm">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm tracking-widest uppercase text-gray-500 block">
                Full Name(s)
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full border-b border-gray-300 py-3 md:py-4 bg-transparent focus:outline-none focus:border-[#c4b5a2] transition-colors"
                placeholder="Jane & John Doe"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm tracking-widest uppercase text-gray-500 block">
                Will you attend?
              </label>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <label className="flex items-center gap-3 cursor-pointer group py-2 sm:py-0">
                  <input type="radio" name="attending" value="yes" required className="accent-[#c4b5a2] w-4 h-4" />
                  <span className="text-gray-700 group-hover:text-[#1a1a1a] transition-colors">Joyfully Accept</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group py-2 sm:py-0">
                  <input type="radio" name="attending" value="no" required className="accent-[#c4b5a2] w-4 h-4" />
                  <span className="text-gray-700 group-hover:text-[#1a1a1a] transition-colors">Regretfully Decline</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="dietary" className="text-sm tracking-widest uppercase text-gray-500 block">
                Dietary Restrictions
              </label>
              <input
                type="text"
                id="dietary"
                className="w-full border-b border-gray-300 py-3 md:py-4 bg-transparent focus:outline-none focus:border-[#c4b5a2] transition-colors"
                placeholder="None"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-[#1a1a1a] text-white py-4 md:py-5 uppercase tracking-widest text-sm hover:bg-[#2a2a2a] transition-colors disabled:opacity-70 mt-4"
            >
              {status === "submitting" ? "Sending..." : "Submit RSVP"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
