"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Guestbook() {
  const [messages, setMessages] = useState([
    { name: "Sarah & Mark", message: "So happy for you both! Can't wait to celebrate.", date: "May 1, 2026" },
    { name: "The Johnson Family", message: "Wishing you a lifetime of love and happiness.", date: "May 3, 2026" },
  ]);

  const [newMessage, setNewMessage] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.name || !newMessage.message) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setMessages([{ ...newMessage, date: "Just now" }, ...messages]);
      setNewMessage({ name: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-24 md:py-40 px-6 bg-vintage-bg text-vintage-ink overflow-hidden border-t border-vintage-ink/10">
      <div className="container mx-auto max-w-4xl relative">
        <div className="text-center mb-16 md:mb-24">
          <p className="font-jetbrains text-xs tracking-[0.2em] uppercase text-vintage-ink/50 mb-4">Chapter IV</p>
          <h2 className="font-serif text-5xl md:text-7xl">Guestbook</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-3xl mb-8 italic">Leave a Note</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-vintage-ink/30 py-3 font-serif focus:outline-none focus:border-vintage-ink transition-colors"
                  value={newMessage.name}
                  onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full bg-transparent border-b border-vintage-ink/30 py-3 font-serif focus:outline-none focus:border-vintage-ink transition-colors resize-none"
                  value={newMessage.message}
                  onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-transparent text-vintage-ink border border-vintage-ink px-8 py-3 font-jetbrains uppercase tracking-[0.2em] text-xs hover:bg-vintage-ink hover:text-vintage-bg transition-all duration-300 disabled:opacity-50 mt-4"
              >
                {isSubmitting ? "Signing..." : "Sign Guestbook"}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="font-serif text-3xl mb-8 italic text-vintage-ink/60">Wishes</h3>
            <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className="border-l-2 border-vintage-ink/20 pl-6 py-2">
                  <p className="font-serif text-xl italic mb-3">"{msg.message}"</p>
                  <p className="font-jetbrains text-xs tracking-widest uppercase text-vintage-ink/80">— {msg.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
