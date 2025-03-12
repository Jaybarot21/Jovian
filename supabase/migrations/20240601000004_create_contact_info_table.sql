-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  business_hours TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default contact information
INSERT INTO contact_info (address, phone, email, business_hours)
VALUES (
  '123 Business Avenue, Mumbai, India',
  '+91 123 456 7890',
  'contact@jovianoverseas.com',
  'Mon-Fri: 9:00 AM - 6:00 PM IST'
);

-- Enable row level security
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public read access" ON contact_info;
CREATE POLICY "Public read access"
ON contact_info FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admin full access" ON contact_info;
CREATE POLICY "Admin full access"
ON contact_info FOR ALL
USING (auth.role() = 'authenticated');

-- Enable realtime
alter publication supabase_realtime add table contact_info;
