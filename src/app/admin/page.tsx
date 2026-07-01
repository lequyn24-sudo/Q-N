"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-vintage-bg flex items-center justify-center">
        <p className="font-jetbrains text-sm tracking-widest uppercase text-vintage-soft-brown animate-pulse">
          Đang tải...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vintage-bg">
      {/* Admin Header */}
      <header className="bg-white border-b border-vintage-ink/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-vintage-ink">Dashboard</h1>
            <p className="font-jetbrains text-[10px] uppercase tracking-widest text-vintage-soft-brown">
              Quản trị viên
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="border border-vintage-ink/20 px-6 py-2 font-jetbrains text-xs tracking-widest uppercase text-vintage-ink hover:bg-vintage-ink hover:text-vintage-ivory transition-colors"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white p-12 border border-vintage-ink/10 shadow-sm relative">
          <div className="absolute inset-2 border border-vintage-ink/5 pointer-events-none" />
          
          <h2 className="font-serif text-3xl text-vintage-ink mb-4">Xin chào, {user?.email}</h2>
          <p className="font-jetbrains text-sm text-vintage-soft-brown leading-relaxed">
            Hệ thống xác thực đã hoạt động. Các tính năng quản lý khách mời (Guest Management), xuất/nhập Excel và quản lý RSVP sẽ được triển khai trong các giai đoạn tiếp theo.
          </p>
        </div>
      </main>
    </div>
  );
}
