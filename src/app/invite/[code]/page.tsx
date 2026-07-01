"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import { Loader2 } from "lucide-react";

export default function InvitePage() {
  const params = useParams();
  const code = params.code as string;
  const [guestData, setGuestData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadGuest() {
      if (!code) return;
      
      const { data, error } = await supabase.rpc("get_guest_by_code", { p_invite_code: code });
      
      if (error || !data || data.length === 0) {
        console.error("Error loading guest:", error);
        setError(true);
      } else {
        setGuestData(data[0]);
      }
      setLoading(false);
    }
    
    loadGuest();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-vintage-bg">
        <Loader2 className="w-8 h-8 animate-spin text-vintage-ink/50" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-vintage-bg text-center px-6">
        <h1 className="font-serif text-4xl text-vintage-burgundy mb-4">Xin lỗi!</h1>
        <p className="font-jetbrains text-vintage-ink/70 max-w-md">
          Đường link thiệp mời này không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường link bạn nhận được nhé.
        </p>
      </div>
    );
  }

  return (
    <main>
      <OpeningAnimation />
      <Navigation />
      <BackgroundMusic />
      
      {/* Truyền tên khách vào Hero */}
      <Hero guestName={guestData.name} />
      
      <Story />
      <VideoSection />
      <Gallery />
      <Timeline />
      <WeddingDetails />
      
      {/* Truyền dữ liệu khách vào RSVP để họ xác nhận */}
      <RSVP guestData={guestData} />
      
      <Guestbook />
      <Footer />
    </main>
  );
}
