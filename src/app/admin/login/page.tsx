"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email hoặc mật khẩu không chính xác.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-vintage-bg flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-12 shadow-2xl w-full max-w-md border border-vintage-ink/10 relative">
        <div className="absolute inset-2 border border-vintage-ink/5 pointer-events-none" />
        
        <h1 className="font-serif text-4xl mb-2 text-vintage-ink text-center">Admin</h1>
        <p className="font-jetbrains text-[10px] uppercase tracking-widest text-vintage-soft-brown text-center mb-8">
          Đăng nhập hệ thống
        </p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 mb-6 rounded-sm text-xs font-jetbrains text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-vintage-ink text-xs font-jetbrains uppercase tracking-widest mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-vintage-ink/20 py-2 focus:outline-none focus:border-vintage-sepia text-vintage-ink bg-transparent transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-vintage-ink text-xs font-jetbrains uppercase tracking-widest mb-2">Mật khẩu</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-vintage-ink/20 py-2 focus:outline-none focus:border-vintage-sepia text-vintage-ink bg-transparent transition-colors"
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-vintage-ink text-vintage-ivory font-jetbrains uppercase tracking-[0.3em] text-xs py-4 hover:bg-vintage-ink/90 transition-all duration-300 disabled:opacity-50 mt-8"
          >
            {loading ? "Đang xử lý..." : "Đăng Nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
