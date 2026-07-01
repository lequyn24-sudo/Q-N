"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Music, Pause } from "lucide-react";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio only on client side
    audioRef.current = new Audio("/audio/bgm.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    // Tự động phát nhạc khi người dùng có tương tác đầu tiên (cuộn hoặc click)
    // Các trình duyệt hiện đại (như Chrome, Safari) chặn tự động phát nhạc nếu không có tương tác của người dùng
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Autoplay prevented by browser:", err);
        });
        
        // Gỡ bỏ sự kiện sau khi đã tương tác lần đầu
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("scroll", handleFirstInteraction);
        window.removeEventListener("touchstart", handleFirstInteraction);
      }
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("scroll", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []); // Run once on mount

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Error playing audio:", err);
      });
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={togglePlay}
      className={`fixed bottom-6 left-6 z-50 p-2 md:p-3 rounded-full shadow-lg border transition-all duration-500 flex items-center justify-center bg-vintage-cream/90 backdrop-blur-sm border-vintage-ink/20 hover:border-vintage-ink/40 hover:scale-105 hover:bg-vintage-ivory`}
      aria-label="Toggle Background Music"
      style={{ boxShadow: '0 10px 25px -5px rgba(52, 38, 25, 0.2)' }}
    >
      <div className="relative flex items-center justify-center">
        {/* Vinyl Record Custom SVG */}
        <svg 
          viewBox="0 0 100 100" 
          className={`w-10 h-10 md:w-12 md:h-12 transition-transform duration-700 ${isPlaying ? 'animate-[spin_2s_linear_infinite]' : ''}`}
        >
          {/* Outer edge */}
          <circle cx="50" cy="50" r="48" fill="#2d2621" />
          {/* Subtle reflection / highlights */}
          <path d="M 50 2 A 48 48 0 0 1 98 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path d="M 50 98 A 48 48 0 0 1 2 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          
          {/* Grooves */}
          <circle cx="50" cy="50" r="38" fill="none" stroke="#403630" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="#403630" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="#403630" strokeWidth="1.5" />
          
          {/* Center label (burgundy) */}
          <circle cx="50" cy="50" r="13" fill="#6E2B35" />
          {/* Inner ring */}
          <circle cx="50" cy="50" r="13" fill="none" stroke="#E1C699" strokeWidth="0.5" />
          
          {/* Spindle hole */}
          <circle cx="50" cy="50" r="3.5" fill="#E9E4D8" />
        </svg>

        {/* Floating music notes when playing */}
        {isPlaying && (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{ opacity: [0, 1, 0], y: -30, x: 15 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute text-vintage-burgundy top-0 right-0 pointer-events-none"
            >
              <Music size={12} />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{ opacity: [0, 1, 0], y: -25, x: 25 }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 1, ease: "linear" }}
              className="absolute text-vintage-sepia top-1 right-[-5px] pointer-events-none"
            >
              <Music size={10} />
            </motion.div>
          </>
        )}
      </div>
    </motion.button>
  );
}
