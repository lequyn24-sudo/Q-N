-- Khởi tạo extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- TABLE: guests
-- ==========================================
CREATE TABLE IF NOT EXISTS guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invite_code TEXT UNIQUE,
    name TEXT NOT NULL,
    guest_count INTEGER DEFAULT 1,
    table_number INTEGER DEFAULT NULL,
    seat_number INTEGER DEFAULT NULL,
    opened BOOLEAN DEFAULT FALSE,
    opened_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo Index cho invite_code để tăng tốc độ truy vấn khi khách hàng truy cập bằng link
CREATE INDEX IF NOT EXISTS idx_guests_invite_code ON guests(invite_code);

-- ==========================================
-- TABLE: rsvp
-- ==========================================
CREATE TABLE IF NOT EXISTS rsvp (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest_id UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
    attendance BOOLEAN,
    attending_count INTEGER,
    message TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo Index cho guest_id để truy vấn RSVP của khách hàng nhanh hơn
CREATE INDEX IF NOT EXISTS idx_rsvp_guest_id ON rsvp(guest_id);

-- ==========================================
-- TABLE: settings
-- ==========================================
CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bride_name TEXT,
    groom_name TEXT,
    wedding_date TIMESTAMP WITH TIME ZONE,
    venue TEXT,
    google_maps_url TEXT,
    background_music_url TEXT,
    primary_color TEXT,
    secondary_color TEXT,
    rsvp_deadline TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- TRIGGERS: Tự động cập nhật trường updated_at
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_guests_updated_at
    BEFORE UPDATE ON guests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
