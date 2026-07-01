"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-vintage-bg text-vintage-ink py-24 px-6 overflow-hidden border-t border-vintage-ink/20">
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="w-16 h-16 mx-auto border border-vintage-ink/20 rounded-full flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 rounded-full border border-vintage-ink/10 animate-[spin_15s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
            <span className="font-serif italic text-2xl">Q&N</span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl mb-8 tracking-widest uppercase">
            Chân Thành Cảm Ơn
          </h2>
          <p className="font-serif text-lg md:text-xl italic text-vintage-ink/70 mb-16">
            Vì đã là một phần trong câu chuyện của chúng mình.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 font-jetbrains text-xs tracking-[0.2em] uppercase text-vintage-ink/50 border-t border-vintage-ink/10 pt-12">
            <span>© 2026 Quyn & Nhàn</span>
            <span>The Design Of Us</span>
            <span>Đà Lạt, VN</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
