-- Allow reading email list rows (admin dashboard uses the anon key)
CREATE POLICY "Allow reading email list"
  ON lisas_natural_path_email_list
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow reading booking rows (admin dashboard uses the anon key)
CREATE POLICY "Allow reading bookings"
  ON service_bookings
  FOR SELECT
  TO anon, authenticated
  USING (true);
