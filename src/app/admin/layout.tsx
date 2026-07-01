"use client";

import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setUser(session.user);
        }
      });
      
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (session) setUser(session.user);
        else setUser(null);
      });
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, [isLoginPage]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-gray-200 flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">Q&N</span>
              </div>
              <span className="font-medium text-sm text-gray-800">Workspace</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-1">
              <Link 
                href="/admin" 
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${pathname === '/admin' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                Overview
              </Link>
              <Link 
                href="/admin/guests" 
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${pathname === '/admin/guests' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                Guests
              </Link>
            </nav>
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
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
