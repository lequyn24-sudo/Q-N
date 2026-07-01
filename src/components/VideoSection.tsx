"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Đảm bảo thuộc tính cho iOS
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    // Thử play ngay lập tức
    const attemptPlay = () => {
      if (video.paused) {
        video.play().catch(() => {
          // Bỏ qua lỗi nếu trình duyệt chặn
        });
      }
    };

    attemptPlay();

    // Bí kíp vượt rào: Lắng nghe tương tác dứt khoát của người dùng (click, touchend) để ép video chạy
    const interactions = ['click', 'touchend'];
    
    const handleInteraction = () => {
      attemptPlay();
      // Nếu video đã chạy được, gỡ bỏ lắng nghe để không làm nặng máy
      if (!video.paused) {
        interactions.forEach(event => {
          window.removeEventListener(event, handleInteraction);
        });
      }
    };

    interactions.forEach(event => {
      window.addEventListener(event, handleInteraction, { passive: true });
    });

    return () => {
      interactions.forEach(event => {
        window.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 bg-vintage-bg overflow-hidden relative">
      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center">
        
        {/* Editorial Text Top */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="font-jetbrains text-[10px] md:text-xs tracking-[0.3em] uppercase text-vintage-olive mb-4">
            The Way We Create
          </p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-vintage-ink leading-tight tracking-tight italic">
            The Decisions <br/> 
            <span className="font-script text-5xl md:text-7xl text-vintage-burgundy ml-8 not-italic">We Believe In</span>
          </h2>
        </motion.div>

        {/* Video Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="relative w-full max-w-4xl aspect-[16/9] md:aspect-video bg-vintage-ivory p-3 shadow-2xl -rotate-1 z-10"
        >
          <div className="w-full h-full relative overflow-hidden bg-vintage-ivory">
            <video 
              ref={videoRef}
              src="/videos/motorcycle.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              poster="/images/hero-lineart.jpg"
              className="object-cover w-full h-full grayscale-[40%] sepia-[30%] contrast-110 opacity-90"
            />
            
            {/* Film Grain/Noise Overlay specifically for the video */}
            <div 
              className="absolute inset-0 z-10 opacity-[0.08] mix-blend-multiply pointer-events-none" 
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
            />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
