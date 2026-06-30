export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#faf9f6] py-20 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="font-serif text-4xl md:text-6xl mb-8 tracking-widest">
          Quyn <span className="text-[#c4b5a2] mx-2">&amp;</span> Nhàn
        </h2>
        <p className="text-sm tracking-widest uppercase mb-12 opacity-80">
          We can&apos;t wait to celebrate with you
        </p>
        
        <div className="h-[1px] w-24 bg-[#c4b5a2] mx-auto mb-12" />
        
        <p className="text-xs tracking-wider opacity-60">
          &copy; {new Date().getFullYear()} Quyn &amp; Nhàn. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
