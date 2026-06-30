export default function Footer() {
  return (
    <footer className="relative bg-retro-brown text-retro-cream py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="font-serif text-4xl md:text-6xl mb-8 tracking-widest">
          Quyn <span className="text-retro-gold mx-2">&amp;</span> Nhàn
        </h2>
        <p className="text-sm tracking-widest uppercase mb-12 opacity-80 text-retro-cream/80">
          We can&apos;t wait to celebrate with you
        </p>
        
        <div className="h-[1px] w-24 bg-retro-gold mx-auto mb-12" />
        
        <p className="text-xs tracking-wider opacity-60 text-retro-cream/60">
          &copy; {new Date().getFullYear()} Quyn &amp; Nhàn. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
