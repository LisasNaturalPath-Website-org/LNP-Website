-- Create lnp_email_list table
CREATE TABLE lnp_email_list (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lnp_email_list ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous email subscription" ON lnp_email_list
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow reading email list" ON lnp_email_list
  FOR SELECT TO anon, authenticated USING (true);

-- Create lnp_bookings table
CREATE TABLE lnp_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  health_concerns text,
  service_title text NOT NULL,
  service_type text,
  duration text,
  price numeric,
  booking_date date,
  booking_time text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lnp_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous booking submission" ON lnp_bookings
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow reading bookings" ON lnp_bookings
  FOR SELECT TO anon, authenticated USING (true);

-- Drop old tables
DROP TABLE IF EXISTS customer_questions;
DROP TABLE IF EXISTS service_bookings;
DROP TABLE IF EXISTS lisas_natural_path_email_list;
