"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Guestbook() {
  const [messages, setMessages] = useState([
    { name: "Lan & Minh", message: "Chúc hai bạn trăm năm hạnh phúc! Rất mong chờ đến ngày vui của hai bạn.", date: "1 Tháng 5, 2026" },
    { name: "Gia đình chú Tuấn", message: "Chúc hai cháu một đời bình an và hạnh phúc viên mãn.", date: "3 Tháng 5, 2026" },
  ]);

  const [newMessage, setNewMessage] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.name || !newMessage.message) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setMessages([{ ...newMessage, date: "Vừa xong" }, ...messages]);
      setNewMessage({ name: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="guestbook" className="py-24 md:py-40 px-6 bg-vintage-bg text-vintage-ink overflow-hidden border-t border-vintage-ink/5 relative">
      <div className="container mx-auto max-w-[90rem] relative z-10">
        
        <div className="grid md:grid-cols-12 gap-16 md:gap-24 items-start">
          
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="md:col-span-12 lg:col-span-5 lg:col-start-2 bg-vintage-ivory p-8 md:p-16 border border-vintage-ink/10 shadow-2xl relative"
          >
            {/* Inner Border */}
            <div className="absolute inset-3 border border-vintage-ink/5 pointer-events-none" />

            <div className="text-center mb-12">

              <h2 className="font-serif text-[4rem] md:text-[5.5rem] leading-none tracking-tight text-vintage-ink mb-6">Sổ Lưu Bút</h2>
              <div className="w-12 h-px bg-vintage-sepia/40 mx-auto" />
            </div>

            <h3 className="font-serif text-3xl mb-8 italic text-vintage-ink text-center">Gửi Lời Chúc</h3>
            <form onSubmit={handleSubmit} className="space-y-10 px-2 md:px-6 relative z-10">
              <div>
                <input
                  type="text"
                  placeholder="Tên Của Bạn"
                  className="w-full bg-transparent border-b border-vintage-ink/20 py-3 font-serif text-xl text-center text-vintage-ink focus:outline-none focus:border-vintage-sepia transition-colors placeholder:text-vintage-ink/30 italic"
                  value={newMessage.name}
                  onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Lời Chúc..."
                  rows={4}
                  className="w-full bg-transparent border-b border-vintage-ink/20 py-3 font-serif text-xl text-center text-vintage-ink focus:outline-none focus:border-vintage-sepia transition-colors resize-none placeholder:text-vintage-ink/30 italic"
                  value={newMessage.message}
                  onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                  required
                />
              </div>
              <div className="pt-6 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-transparent text-vintage-ink border border-vintage-ink/40 px-10 py-3 font-jetbrains uppercase tracking-[0.3em] text-[10px] hover:bg-vintage-ink hover:text-vintage-ivory hover:border-vintage-ink transition-all duration-500 disabled:opacity-50 w-full"
                >
                  {isSubmitting ? "Đang Gửi..." : "Gửi Lời Chúc"}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Messages Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="md:col-span-12 lg:col-span-5 relative mt-12 lg:mt-24"
          >
            <h3 className="font-serif text-4xl mb-12 italic text-vintage-ink/40">Những Lời Chúc</h3>
            
            <div className="space-y-12 max-h-[600px] overflow-y-auto pr-8 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className="absolute left-0 top-2 w-4 h-px bg-vintage-sepia/40" />
                  <p className="font-serif text-2xl md:text-3xl italic text-vintage-soft-brown leading-relaxed mb-4">
                    "{msg.message}"
                  </p>
                  <p className="font-jetbrains text-[10px] tracking-[0.2em] uppercase text-vintage-ink/60">
                    — {msg.name}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
