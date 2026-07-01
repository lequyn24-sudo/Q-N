-- Kích hoạt RLS trên tất cả các bảng
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- ========================================================
-- CHÍNH SÁCH DÀNH CHO ADMIN (Đã đăng nhập)
-- Admin có toàn quyền (CRUD) trên tất cả các bảng
-- ========================================================
CREATE POLICY "Admin có toàn quyền trên guests" ON guests FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin có toàn quyền trên rsvp" ON rsvp FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin có toàn quyền trên settings" ON settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ========================================================
-- CHÍNH SÁCH DÀNH CHO KHÁCH (Chưa đăng nhập / anon)
-- Khách KHÔNG CÓ QUYỀN TRUY VẤN TRỰC TIẾP (Bị chặn bởi RLS)
-- Khách chỉ có thể tương tác thông qua các Hàm bảo mật bên dưới
-- ========================================================

-- Hàm bảo mật 1: Khách lấy thông tin thiệp bằng Invite Code
-- Dùng SECURITY DEFINER để hàm này có quyền của Admin (bỏ qua RLS khi chạy bên trong)
CREATE OR REPLACE FUNCTION public.get_guest_by_code(p_invite_code text)
RETURNS TABLE (
    id uuid,
    invite_code text,
    name text,
    guest_count integer,
    table_number integer,
    seat_number integer,
    opened boolean,
    opened_at timestamp with time zone,
    phone text,
    email text
) 
SECURITY DEFINER
AS $$
BEGIN
    -- Đánh dấu là thiệp đã được mở (nếu chưa mở)
    UPDATE guests SET opened = true, opened_at = NOW() 
    WHERE guests.invite_code = p_invite_code AND guests.opened = false;
    
    -- Trả về thông tin khách
    RETURN QUERY 
    SELECT g.id, g.invite_code, g.name, g.guest_count, g.table_number, g.seat_number, g.opened, g.opened_at, g.phone, g.email
    FROM guests g
    WHERE g.invite_code = p_invite_code;
END;
$$ LANGUAGE plpgsql;

-- Hàm bảo mật 2: Khách gửi xác nhận RSVP
CREATE OR REPLACE FUNCTION public.submit_rsvp(
    p_guest_id uuid,
    p_attendance boolean,
    p_count integer,
    p_message text
)
RETURNS void
SECURITY DEFINER
AS $$
BEGIN
    -- Kiểm tra xem khách này đã RSVP chưa, nếu có thì cập nhật, chưa thì thêm mới
    IF EXISTS (SELECT 1 FROM rsvp WHERE guest_id = p_guest_id) THEN
        UPDATE rsvp 
        SET attendance = p_attendance, attending_count = p_count, message = p_message, submitted_at = NOW()
        WHERE guest_id = p_guest_id;
    ELSE
        INSERT INTO rsvp (guest_id, attendance, attending_count, message)
        VALUES (p_guest_id, p_attendance, p_count, p_message);
    END IF;
END;
$$ LANGUAGE plpgsql;
