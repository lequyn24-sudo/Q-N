"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Dùng IntersectionObserver để tự động chạy video khi cuộn tới
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Đảm bảo playsInline được áp dụng mạnh nhất cho iOS
    videoElement.setAttribute("playsinline", "true");
    videoElement.setAttribute("webkit-playsinline", "true");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Khi video xuất hiện trên màn hình, thử chạy nó
            videoElement.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              // Bị trình duyệt chặn
              setIsPlaying(false);
            });
          } else {
            // Tạm dừng khi cuộn qua khỏi màn hình để tiết kiệm pin
            videoElement.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 } // Kích hoạt khi video hiển thị 50%
    );

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

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
          className="relative w-full max-w-4xl aspect-[16/9] md:aspect-video bg-vintage-ivory p-3 shadow-2xl -rotate-1 z-10 cursor-pointer group"
          onClick={toggleVideo}
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
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="object-cover w-full h-full grayscale-[40%] sepia-[30%] contrast-110 opacity-90"
            />
            
            {/* Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-vintage-bg/20 backdrop-blur-[2px]">
                <div className="w-16 h-16 rounded-full bg-vintage-cream/90 border border-vintage-ink/20 shadow-lg flex items-center justify-center text-vintage-ink/80 transition-transform hover:scale-110">
                  <Play size={24} className="ml-1" />
                </div>
              </div>
            )}
            
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
