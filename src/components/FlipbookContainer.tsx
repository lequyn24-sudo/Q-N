"use client";

import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";

export default function FlipbookContainer({ children }: { children: React.ReactNode }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const bookRef = useRef(null);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowSize.width === 0) return null;

  // On mobile, show one page. On desktop, show two pages like an open book.
  const isMobile = windowSize.width < 768;
  const bookWidth = isMobile ? windowSize.width : Math.min(windowSize.width / 2, 800);
  const bookHeight = windowSize.height;

  return (
    <div className="w-full h-[100dvh] flex items-center justify-center bg-[#1c1c1c] overflow-hidden select-none">
      <HTMLFlipBook
        width={bookWidth}
        height={bookHeight}
        size="stretch"
        minWidth={300}
        maxWidth={800}
        minHeight={400}
        maxHeight={1200}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="newspaper-flipbook drop-shadow-2xl"
        style={{ margin: "0 auto" }}
        drawShadow={true}
        flippingTime={800}
        usePortrait={true}
        startZIndex={0}
        startPage={0}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
        ref={bookRef}
      >
        {children}
      </HTMLFlipBook>
    </div>
  );
}
