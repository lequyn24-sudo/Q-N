"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { id: number; name: string; text: string };

export default function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, name: "Alice & Bob", text: "So incredibly happy for you both! Can't wait to celebrate." },
    { id: 2, name: "Sarah M.", text: "Wishing you a lifetime of love and happiness." }
  ]);
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newText) return;
    
    setMessages([{ id: Date.now(), name: newName, text: newText }, ...messages]);
    setNewName("");
    setNewText("");
  };

  return (
    <section className="py-20 md:py-32 px-6 bg-retro-cream">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-5xl text-retro-ink mb-4">Guestbook</h2>
          <p className="text-retro-brown/60 font-light">Leave a note for the couple</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm tracking-widest uppercase text-gray-500 block">Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full border-b border-gray-300 py-3 md:py-2 focus:outline-none focus:border-[#c4b5a2] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm tracking-widest uppercase text-gray-500 block">Message</label>
                <textarea
                  required
                  rows={4}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full border-b border-gray-300 py-3 md:py-2 focus:outline-none focus:border-[#c4b5a2] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-transparent border border-[#1a1a1a] text-[#1a1a1a] px-8 py-4 md:py-3 uppercase tracking-widest text-sm hover:bg-[#1a1a1a] hover:text-white transition-colors"
              >
                Sign Guestbook
              </button>
            </form>
          </div>

          {/* Messages */}
          <div className="space-y-6 md:space-y-8 max-h-[400px] overflow-y-auto pr-2 md:pr-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-l border-[#c4b5a2] pl-4 md:pl-6 py-2"
                >
                  <p className="text-gray-600 font-light italic mb-2">&quot;{msg.text}&quot;</p>
                  <p className="text-sm uppercase tracking-widest text-[#1a1a1a]">— {msg.name}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
