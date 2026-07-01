import Hero from "@/components/Hero";
import Story from "@/components/Story";
import VideoSection from "@/components/VideoSection";
import Gallery from "@/components/Gallery";
import Timeline from "@/components/Timeline";
import WeddingDetails from "@/components/WeddingDetails";
import RSVP from "@/components/RSVP";
import Guestbook from "@/components/Guestbook";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import OpeningAnimation from "@/components/OpeningAnimation";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function Home() {
  return (
    <main>
      <OpeningAnimation />
      <Navigation />
      <BackgroundMusic />
      
      <Hero />
      <Story />
      <VideoSection />
      <Gallery />
      <Timeline />
      <WeddingDetails />
      <RSVP />
      <Guestbook />
      <Footer />
    </main>
  );
}
