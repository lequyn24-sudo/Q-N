import { supabase } from "@/lib/supabase";
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

export default async function InvitePage({ params }: { params: Promise<{ code: string }> }) {
  const resolvedParams = await params;
  const code = resolvedParams.code;

  // Lấy dữ liệu khách mời trực tiếp trên Server (SSR)
  // Đảm bảo HTML trả về nguyên vẹn 100% giống trang chủ, giúp video tự động chạy (autoplay) trên iOS/Safari
  const { data, error } = await supabase.rpc("get_guest_by_code", { p_invite_code: code });

  if (error || !data || data.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-vintage-bg text-center px-6">
        <h1 className="font-serif text-4xl text-vintage-burgundy mb-4">Xin lỗi!</h1>
        <p className="font-jetbrains text-vintage-ink/70 max-w-md">
          Đường link thiệp mời này không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường link bạn nhận được nhé.
        </p>
      </div>
    );
  }

  const guestData = data[0];

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
      
      <WeddingDetails guestName={guestData.name} />
      <RSVP guestData={guestData} />
      
      <Guestbook />
      <Footer />
    </main>
  );
}
