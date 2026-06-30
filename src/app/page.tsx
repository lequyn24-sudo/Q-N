import OpeningAnimation from "@/components/OpeningAnimation";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Gallery from "@/components/Gallery";
import Timeline from "@/components/Timeline";
import WeddingDetails from "@/components/WeddingDetails";
import GoogleMapSection from "@/components/GoogleMapSection";
import RSVP from "@/components/RSVP";
import Guestbook from "@/components/Guestbook";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#faf9f6]">
      <OpeningAnimation />
      <Navigation />
      <Hero />
      <Story />
      <Gallery />
      <Timeline />
      <WeddingDetails />
      <GoogleMapSection />
      <RSVP />
      <Guestbook />
      <Footer />
    </main>
  );
}
