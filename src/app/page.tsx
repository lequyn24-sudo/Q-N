import OpeningAnimation from "@/components/OpeningAnimation";
import FlipbookContainer from "@/components/FlipbookContainer";
import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-full bg-[#1c1c1c]">
      <OpeningAnimation />
      
      <FlipbookContainer>
        
        {/* PAGE 1: COVER */}
        <PageWrapper pageNumber={1}>
          <div className="flex flex-col items-center h-full text-center">
            <h1 className="font-unifraktur text-6xl md:text-8xl mt-4 mb-2 md:mb-6">The Wedding Post</h1>
            
            <div className="w-full flex justify-between items-center border-y-2 border-newspaper-border py-2 mb-6 font-serif text-[10px] md:text-xs tracking-widest uppercase">
              <span>May 4th, 2024</span>
              <span>Save The Date</span>
              <span>Malibu, CA</span>
            </div>

            <div className="relative w-full flex-1 min-h-[300px] border border-newspaper-border p-1 mb-4">
              <div className="relative w-full h-full overflow-hidden grayscale contrast-125 sepia-[.2]">
                <Image 
                  src="/images/hero.png" 
                  alt="Quyn & Nhàn" 
                  fill 
                  className="object-cover object-top"
                />
                
                <div className="absolute inset-0 bg-black/20" />
                
                <h2 className="absolute top-10 left-0 w-full text-center font-playfair italic text-5xl md:text-7xl text-white drop-shadow-lg z-10 px-4">
                  Quyn and Nhàn
                </h2>
                
                <p className="absolute bottom-6 w-full text-center font-serif tracking-[0.2em] uppercase text-white/90 text-sm md:text-base z-10">
                  Saying "I Do"
                </p>
              </div>
            </div>
            
            <p className="font-serif italic text-newspaper-ink/80 text-sm">
              Swipe or click the edges to open
            </p>
          </div>
        </PageWrapper>

        {/* PAGE 2: STORY */}
        <PageWrapper pageNumber={2}>
          <div className="h-full">
            <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6 border-b border-newspaper-border pb-4">
              A Love Story for the Ages
            </h2>
            
            <div className="columns-1 md:columns-2 gap-8 text-justify font-serif text-base md:text-lg leading-relaxed">
              <p className="mb-4">
                <span className="float-left text-6xl font-unifraktur leading-[0.8] pr-2 pt-2">I</span>t was a serendipitous encounter in the heart of the city that brought Quyn and Nhàn together. What started as a fleeting glance soon blossomed into an epic romance, defying all odds.
              </p>
              <p className="mb-4">
                Friends and family note that their bond is something out of a classic novel. "They just understand each other perfectly," a close friend remarked.
              </p>
              
              <div className="w-full relative h-48 my-6 border border-newspaper-border p-1 grayscale contrast-125 sepia-[.2]">
                <Image src="/images/gallery-1.png" alt="Couple" fill className="object-cover" />
              </div>
              
              <p className="mb-4">
                After years of building a life together, traveling the world, and supporting each other through every endeavor, they are finally ready to tie the knot and celebrate with their loved ones.
              </p>
            </div>
          </div>
        </PageWrapper>

        {/* PAGE 3: ITINERARY */}
        <PageWrapper pageNumber={3}>
          <div className="h-full">
            <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6 border-b border-newspaper-border pb-4">
              The Day's Itinerary
            </h2>
            
            <div className="space-y-8 font-serif mt-8">
              <div className="flex flex-col border-b border-newspaper-border/30 pb-4">
                <span className="font-bold text-2xl mb-1">3:00 PM</span>
                <span className="uppercase tracking-widest text-sm mb-2 font-bold">Welcome Drinks</span>
                <p className="italic text-newspaper-ink/80">Arrive early and enjoy a refreshment before the ceremony begins.</p>
              </div>
              
              <div className="flex flex-col border-b border-newspaper-border/30 pb-4">
                <span className="font-bold text-2xl mb-1">4:00 PM</span>
                <span className="uppercase tracking-widest text-sm mb-2 font-bold">The Ceremony</span>
                <p className="italic text-newspaper-ink/80">Witness our exchange of vows in the main courtyard.</p>
              </div>
              
              <div className="flex flex-col border-b border-newspaper-border/30 pb-4">
                <span className="font-bold text-2xl mb-1">5:30 PM</span>
                <span className="uppercase tracking-widest text-sm mb-2 font-bold">Cocktail Hour</span>
                <p className="italic text-newspaper-ink/80">Drinks, hors d'oeuvres, and live music on the terrace.</p>
              </div>
              
              <div className="flex flex-col">
                <span className="font-bold text-2xl mb-1">7:00 PM</span>
                <span className="uppercase tracking-widest text-sm mb-2 font-bold">Reception</span>
                <p className="italic text-newspaper-ink/80">Dinner, speeches, and dancing into the night.</p>
              </div>
            </div>
          </div>
        </PageWrapper>

        {/* PAGE 4: RSVP */}
        <PageWrapper pageNumber={4}>
          <div className="h-full flex flex-col">
            <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6 border-b border-newspaper-border pb-4">
              RSVP
            </h2>
            
            <div className="flex-1 border-2 border-dashed border-newspaper-border p-6 md:p-8 flex flex-col justify-center bg-newspaper-ink/5">
              <h3 className="font-unifraktur text-3xl text-center mb-2">Kindly Reply</h3>
              <p className="font-serif text-center italic mb-8">by the 1st of August</p>
              
              <form className="space-y-6 font-serif">
                <div>
                  <label className="block uppercase tracking-widest text-xs font-bold mb-2">Name(s)</label>
                  <input type="text" className="w-full bg-transparent border-b border-newspaper-border focus:outline-none focus:border-newspaper-ink pb-2" placeholder="M..................................." />
                </div>
                
                <div className="flex gap-6 mt-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="attending" className="appearance-none w-4 h-4 border border-newspaper-border rounded-sm checked:bg-newspaper-ink" />
                    <span className="italic">Joyfully Accepts</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="attending" className="appearance-none w-4 h-4 border border-newspaper-border rounded-sm checked:bg-newspaper-ink" />
                    <span className="italic">Regretfully Declines</span>
                  </label>
                </div>
                
                <div className="mt-8 pt-8 text-center">
                  <button type="button" className="font-serif uppercase tracking-widest text-sm border border-newspaper-border px-8 py-3 hover:bg-newspaper-ink hover:text-newspaper-bg transition-colors">
                    Send Reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </PageWrapper>

      </FlipbookContainer>
    </main>
  );
}
