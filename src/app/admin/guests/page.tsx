"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Plus, Edit2, Trash2, QrCode, X, Copy, MailOpen, Mail } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

type Guest = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  invite_code: string | null;
  guest_count: number;
  table_number: number | null;
  seat_number: number | null;
  opened: boolean;
  rsvp_status?: boolean | null;
};

export default function GuestManagement() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [currentGuest, setCurrentGuest] = useState<Partial<Guest>>({ guest_count: 1 });
  const [qrData, setQrData] = useState<{link: string, name: string} | null>(null);

  const fetchGuests = async () => {
    setLoading(true);
    const { data: guestsData } = await supabase.from("guests").select("*").order("created_at", { ascending: false });
    const { data: rsvpData } = await supabase.from("rsvp").select("guest_id, attendance");

    if (guestsData) {
      const merged = guestsData.map(g => {
        const rsvp = rsvpData?.find(r => r.guest_id === g.id);
        return { ...g, rsvp_status: rsvp ? rsvp.attendance : null };
      });
      setGuests(merged);
    }
    setLoading(false);
  };

  useEffect(() => { fetchGuests(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, rsvp_status, ...payload } = currentGuest as any;
    
    if (!payload.invite_code) {
      payload.invite_code = Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    if (id) {
      await supabase.from("guests").update(payload).eq("id", id);
    } else {
      await supabase.from("guests").insert([payload]);
    }
    setIsModalOpen(false);
    fetchGuests();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this guest?")) {
      await supabase.from("guests").delete().eq("id", id);
      fetchGuests();
    }
  };

  const showQR = (guest: Guest) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const link = `${origin}/?to=${guest.invite_code || encodeURIComponent(guest.name)}`;
    setQrData({ link, name: guest.name });
    setIsQRModalOpen(true);
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    alert("Copied to clipboard!");
  };

  const filtered = guests.filter(g => 
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.invite_code?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Guest Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage invitations, tracking, and RSVPs.</p>
        </div>
        <button 
          onClick={() => { setCurrentGuest({ guest_count: 1 }); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Guest
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Group</th>
                <th className="px-6 py-4 font-medium">Table/Seat</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">Loading guests...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">No guests found.</td></tr>
              ) : (
                filtered.map(guest => (
                  <tr key={guest.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{guest.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5 uppercase tracking-widest">{guest.invite_code || '-'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600">{guest.phone || '-'}</div>
                      <div className="text-xs text-gray-400">{guest.email || ''}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{guest.guest_count}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {guest.table_number ? `T${guest.table_number}` : '-'} / {guest.seat_number ? `S${guest.seat_number}` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-md w-fit ${guest.opened ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                          {guest.opened ? <MailOpen className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                          {guest.opened ? 'Opened' : 'Unopened'}
                        </span>
                        {guest.rsvp_status !== null && (
                          <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md w-fit ${guest.rsvp_status ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {guest.rsvp_status ? 'Attending' : 'Declined'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => showQR(guest)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="QR Code">
                          <QrCode className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setCurrentGuest(guest); setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(guest.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guest Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">{currentGuest.id ? 'Edit Guest' : 'Add Guest'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                  <input type="text" required value={currentGuest.name || ''} onChange={e => setCurrentGuest({...currentGuest, name: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" value={currentGuest.phone || ''} onChange={e => setCurrentGuest({...currentGuest, phone: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={currentGuest.email || ''} onChange={e => setCurrentGuest({...currentGuest, email: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Guest Count</label>
                  <input type="number" min="1" required value={currentGuest.guest_count || 1} onChange={e => setCurrentGuest({...currentGuest, guest_count: parseInt(e.target.value)})} className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Invite Code</label>
                  <input type="text" placeholder="Auto-generated" value={currentGuest.invite_code || ''} onChange={e => setCurrentGuest({...currentGuest, invite_code: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 uppercase" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Table No.</label>
                  <input type="number" value={currentGuest.table_number || ''} onChange={e => setCurrentGuest({...currentGuest, table_number: parseInt(e.target.value)})} className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Seat No.</label>
                  <input type="number" value={currentGuest.seat_number || ''} onChange={e => setCurrentGuest({...currentGuest, seat_number: parseInt(e.target.value)})} className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Save Guest</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {isQRModalOpen && qrData && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm border border-gray-100 text-center overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Invitation Link</h3>
              <button onClick={() => setIsQRModalOpen(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-8 flex flex-col items-center">
              <h4 className="font-medium text-lg text-gray-900 mb-6">{qrData.name}</h4>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 inline-block">
                <QRCodeSVG value={qrData.link} size={200} level="M" />
              </div>
              <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 flex flex-col gap-3">
                <div className="text-xs text-gray-500 font-mono truncate">{qrData.link}</div>
                <button onClick={() => copyLink(qrData.link)} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Copy className="w-4 h-4" /> Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
