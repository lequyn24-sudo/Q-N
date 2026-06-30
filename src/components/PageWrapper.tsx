import React, { forwardRef } from "react";

interface PageProps {
  children: React.ReactNode;
  pageNumber?: number;
}

const PageWrapper = forwardRef<HTMLDivElement, PageProps>(({ children, pageNumber }, ref) => {
  return (
    <div 
      className="page bg-newspaper-bg text-newspaper-ink overflow-hidden border-r border-newspaper-border/20 shadow-[-10px_0_20px_rgba(0,0,0,0.05)] relative"
      ref={ref}
      style={{ backfaceVisibility: "hidden" }}
    >
      <div className="h-full w-full p-6 md:p-12 flex flex-col">
        {/* Newspaper Header for inner pages */}
        {pageNumber && pageNumber > 1 && (
          <div className="flex justify-between items-center border-b border-newspaper-border pb-2 mb-6 font-serif text-xs md:text-sm tracking-widest uppercase">
            <span>May 4th, 2024</span>
            <span className="font-unifraktur text-lg lowercase tracking-normal">The Wedding Post</span>
            <span>Page {pageNumber}</span>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          {children}
        </div>
      </div>
    </div>
  );
});

PageWrapper.displayName = "PageWrapper";

export default PageWrapper;
