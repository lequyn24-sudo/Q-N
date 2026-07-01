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
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="bg-vintage-ivory border border-vintage-ink/10 p-8 md:p-20 relative shadow-2xl"
        >
          {/* Inner Border (Stationery detail) */}
          <div className="absolute inset-4 border border-vintage-ink/5 pointer-events-none" />

          <div className="text-center mb-16 mt-4">
            <h2 className="font-serif text-5xl md:text-7xl text-vintage-ink mb-6 tracking-tight">Hồi Đáp</h2>
            <div className="w-16 h-px bg-vintage-sepia/40 mx-auto mb-6" />
            <p className="font-serif italic text-vintage-soft-brown text-lg md:text-xl">Xác nhận tham dự</p>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-16"
            >
              <h3 className="font-serif text-4xl mb-4 text-vintage-burgundy italic">Cảm Ơn</h3>
              <p className="font-jetbrains text-xs tracking-widest uppercase text-vintage-ink/50">Phản hồi của bạn đã được ghi nhận</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12 font-serif px-4 md:px-12 relative z-10">
              <div>
                <label className="block text-vintage-dusty-green uppercase tracking-[0.2em] text-[10px] font-jetbrains mb-4 text-center">Họ và Tên</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-transparent border-b border-vintage-ink/20 py-2 text-center text-2xl text-vintage-ink focus:outline-none focus:border-vintage-sepia transition-colors placeholder:text-vintage-ink/20"
                  placeholder="M.........................................................."
                />
              </div>

              <div className="mt-10">
                <label className="block text-vintage-dusty-green uppercase tracking-[0.2em] text-[10px] font-jetbrains mb-4 text-center">Số lượng người tham dự</label>
                <input 
                  type="number" 
                  min="1"
                  className="w-full bg-transparent border-b border-vintage-ink/20 py-2 text-center text-2xl font-serif text-vintage-ink focus:outline-none focus:border-vintage-sepia transition-colors placeholder:text-vintage-ink/20"
                  placeholder="2"
                />
              </div>
              
              <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mt-12">
                <label className="flex items-center gap-4 cursor-pointer group justify-center">
                  <div className="w-6 h-6 border border-vintage-ink/20 rounded-sm flex items-center justify-center group-hover:border-vintage-sepia transition-colors">
                    <input type="radio" name="attending" value="yes" required className="appearance-none w-3 h-3 checked:bg-vintage-burgundy rounded-sm transition-colors" />
                  </div>
                  <span className="text-vintage-soft-brown text-xl md:text-2xl italic group-hover:text-vintage-ink transition-colors">Rất vui được tham dự</span>
                </label>
                <label className="flex items-center gap-4 cursor-pointer group justify-center">
                  <div className="w-6 h-6 border border-vintage-ink/20 rounded-sm flex items-center justify-center group-hover:border-vintage-sepia transition-colors">
                    <input type="radio" name="attending" value="no" required className="appearance-none w-3 h-3 checked:bg-vintage-ink/40 rounded-sm transition-colors" />
                  </div>
                  <span className="text-vintage-soft-brown text-xl md:text-2xl italic group-hover:text-vintage-ink transition-colors">Tiếc là không thể</span>
                </label>
              </div>
              
              <div className="pt-12 text-center">
                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="bg-transparent text-vintage-ink border border-vintage-ink/40 px-12 py-4 font-jetbrains uppercase tracking-[0.3em] text-[10px] hover:bg-vintage-ink hover:text-vintage-ivory hover:border-vintage-ink transition-all duration-500 disabled:opacity-50 w-full md:w-auto"
                >
                  {status === "submitting" ? "Đang Gửi..." : "Gửi Phản Hồi"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
