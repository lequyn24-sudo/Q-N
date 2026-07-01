"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Link as LinkIcon,
  QrCode,
  MailOpen,
  Mail,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Copy,
  Download,
  X,
  Loader2
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

type Guest = {
  id: string;
  invite_code: string;
  name: string;
  phone: string | null;
  email: string | null;
  guest_count: number;
  table_number: number | null;
  seat_number: number | null;
  opened: boolean;
  opened_at: string | null;
  rsvp: { attendance: boolean; attending_count: number; message: string }[];
};

export default function GuestManagement() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Partial<Guest> | null>(null);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("guests")
      .select("*, rsvp(*)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching guests:", error);
    } else {
      setGuests(data as Guest[]);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const guestData = {
      name: editingGuest?.name,
      phone: editingGuest?.phone || null,
      email: editingGuest?.email || null,
      guest_count: editingGuest?.guest_count || 1,
      table_number: editingGuest?.table_number || null,
      seat_number: editingGuest?.seat_number || null,
    };

    if (editingGuest?.id) {
      // Update
      await supabase.from("guests").update(guestData).eq("id", editingGuest.id);
    } else {
      // Create - Generate a random 6-character code
      const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      await supabase.from("guests").insert([{ ...guestData, invite_code: inviteCode }]);
    }

    setIsModalOpen(false);
    setEditingGuest(null);
    setIsSaving(false);
    fetchGuests();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách mời này?")) {
      await supabase.from("guests").delete().eq("id", id);
      fetchGuests();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Đã copy link thiệp!");
  };

  const getInviteLink = (code: string) => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/invite/${code}`;
    }
    return "";
  };

  // Filter and search logic
  const filteredGuests = guests.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          g.invite_code.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    
    const rsvpStatus = g.rsvp && g.rsvp.length > 0 ? g.rsvp[0].attendance : null;
    if (filter === "attending") return matchesSearch && rsvpStatus === true;
    if (filter === "not_attending") return matchesSearch && rsvpStatus === false;
    if (filter === "pending") return matchesSearch && rsvpStatus === null;
    
    return matchesSearch;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto text-neutral-800">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-medium tracking-tight mb-2">Guest Management</h1>
          <p className="text-neutral-500">Quản lý danh sách khách mời và thư mời.</p>
        </div>
        <button
          onClick={() => {
            setEditingGuest({ guest_count: 1 });
            setIsModalOpen(true);
          }}
          className="bg-neutral-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Thêm khách mới
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc mã khách..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all bg-white"
        >
          <option value="all">Tất cả khách mời</option>
          <option value="attending">Đã xác nhận tham gia</option>
          <option value="not_attending">Từ chối tham gia</option>
          <option value="pending">Chưa phản hồi RSVP</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50/50 border-b border-neutral-200 text-neutral-500 font-medium">
              <tr>
                <th className="px-6 py-4">Khách mời</th>

                <th className="px-6 py-4">Mã thiệp</th>
                <th className="px-6 py-4">Trạng thái mở</th>
                <th className="px-6 py-4">RSVP</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Đang tải danh sách...
                  </td>
                </tr>
              ) : filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-400">
                    Không tìm thấy khách mời nào.
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest) => {
                  const rsvp = guest.rsvp && guest.rsvp.length > 0 ? guest.rsvp[0] : null;
                  
                  return (
                    <tr key={guest.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-900">{guest.name}</div>
                        <div className="text-xs text-neutral-500 mt-0.5">Số lượng: {guest.guest_count} người</div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-mono text-xs bg-neutral-100 px-2 py-1 rounded inline-block">
                          {guest.invite_code}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {guest.opened ? (
                          <div className="flex items-center gap-1.5 text-blue-600">
                            <MailOpen className="w-4 h-4" />
                            <span className="text-xs font-medium">Đã mở</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-neutral-400">
                            <Mail className="w-4 h-4" />
                            <span className="text-xs">Chưa mở</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {rsvp ? (
                          rsvp.attendance ? (
                            <div className="flex items-center gap-1.5 text-emerald-600">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="text-xs font-medium">Tham gia ({rsvp.attending_count})</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-red-500">
                              <XCircle className="w-4 h-4" />
                              <span className="text-xs font-medium">Từ chối</span>
                            </div>
                          )
                        ) : (
                          <div className="flex items-center gap-1.5 text-neutral-400">
                            <HelpCircle className="w-4 h-4" />
                            <span className="text-xs">Chưa phản hồi</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => copyToClipboard(getInviteLink(guest.invite_code))}
                            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                            title="Copy link thiệp"
                          >
                            <LinkIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedGuest(guest);
                              setIsQrModalOpen(true);
                            }}
                            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                            title="Xem mã QR"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingGuest(guest);
                              setIsModalOpen(true);
                            }}
                            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(guest.id)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-neutral-100">
              <h3 className="text-lg font-medium">{editingGuest?.id ? "Sửa khách mời" : "Thêm khách mới"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-1.5">Tên khách mời *</label>
                  <input
                    type="text"
                    required
                    value={editingGuest?.name || ""}
                    onChange={(e) => setEditingGuest({ ...editingGuest, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                  />
                </div>
                

                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-1.5">Số người dự kiến</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editingGuest?.guest_count || 1}
                    onChange={(e) => setEditingGuest({ ...editingGuest, guest_count: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-100 font-medium transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-neutral-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-neutral-800 disabled:opacity-50 transition-colors"
                >
                  {isSaving ? "Đang lưu..." : "Lưu thông tin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {isQrModalOpen && selectedGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-sm w-full animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-medium mb-1">{selectedGuest.name}</h3>
            <p className="text-neutral-500 text-sm mb-8">Quét mã để xem thiệp mời</p>
            
            <div className="bg-white p-4 rounded-2xl border border-neutral-100 inline-block shadow-sm mb-8">
              <QRCodeSVG 
                value={getInviteLink(selectedGuest.invite_code)} 
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#0a0a0a"}
                level={"H"}
                includeMargin={false}
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => copyToClipboard(getInviteLink(selectedGuest.invite_code))}
                className="w-full bg-neutral-900 text-white px-5 py-3 rounded-xl font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Link Thiệp
              </button>
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="w-full px-5 py-3 rounded-xl text-neutral-600 hover:bg-neutral-100 font-medium transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
