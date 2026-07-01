"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Users, MailOpen, Mail, CheckCircle2, CircleDashed, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [stats, setStats] = useState({
    totalGuests: 0,
    rsvped: 0,
    notRsvped: 0,
    opened: 0,
    notOpened: 0,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setUser(session.user);
        await fetchStats();
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const fetchStats = async () => {
    try {
      const { count: totalGuests } = await supabase
        .from("guests")
        .select("*", { count: "exact", head: true });

      const { count: opened } = await supabase
        .from("guests")
        .select("*", { count: "exact", head: true })
        .eq("opened", true);

      const { count: rsvped } = await supabase
        .from("rsvp")
        .select("guest_id", { count: "exact", head: true });

      const total = totalGuests || 0;
      const openedCount = opened || 0;
      const rsvpedCount = rsvped || 0;

      setStats({
        totalGuests: total,
        opened: openedCount,
        notOpened: total - openedCount,
        rsvped: rsvpedCount,
        notRsvped: total - rsvpedCount,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-sans">
        <div className="flex items-center gap-2 text-gray-400">
          <CircleDashed className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium tracking-wide">Loading workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-gray-200">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">Q&N</span>
            </div>
            <span className="font-medium text-sm text-gray-800">Wedding Workspace</span>
            <span className="text-gray-300 mx-2">/</span>
            <span className="text-sm text-gray-500">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 font-medium hidden sm:inline-block">
              {user?.email}
            </span>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time statistics for your wedding invitations.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Total Guests Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">Tổng số khách</span>
              <div className="p-2 bg-gray-50 rounded-lg">
                <Users className="w-4 h-4 text-gray-700" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-semibold text-gray-900 tracking-tight">{stats.totalGuests}</h3>
            </div>
          </div>

          {/* RSVP Status */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">Đã RSVP</span>
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-semibold text-gray-900 tracking-tight">{stats.rsvped}</h3>
              <p className="text-xs text-gray-400 mt-2 font-medium">
                {stats.notRsvped} CHƯA PHẢN HỒI
              </p>
            </div>
          </div>

          {/* Open Status */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">Đã mở thiệp</span>
              <div className="p-2 bg-blue-50 rounded-lg">
                <MailOpen className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-semibold text-gray-900 tracking-tight">{stats.opened}</h3>
              <p className="text-xs text-gray-400 mt-2 font-medium">
                {stats.notOpened} CHƯA MỞ
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
