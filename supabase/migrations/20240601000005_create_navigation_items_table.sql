-- Create navigation_items table for editable navigation
CREATE TABLE IF NOT EXISTS navigation_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  href VARCHAR(255) NOT NULL,
  location VARCHAR(50) NOT NULL, -- 'header' or 'footer'
  display_order INT NOT NULL,
  has_dropdown BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create dropdown_items table for dropdown menus
CREATE TABLE IF NOT EXISTS dropdown_items (
  id SERIAL PRIMARY KEY,
  navigation_item_id INT REFERENCES navigation_items(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  href VARCHAR(255) NOT NULL,
  display_order INT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default header navigation items
INSERT INTO navigation_items (name, href, location, display_order, has_dropdown, is_active) VALUES
('Home', '/', 'header', 1, false, true),
('Products', '/products', 'header', 2, true, true),
('About Us', '/about', 'header', 3, false, true),
('Contact', '/#contact', 'header', 4, false, true),
('Forms', '/forms', 'header', 5, false, true);

-- Insert default dropdown items for Products
INSERT INTO dropdown_items (navigation_item_id, name, href, display_order, is_active) VALUES
(2, 'Pulses', '#pulses', 1, true),
(2, 'Grains', '#grains', 2, true),
(2, 'Spices', '#spices', 3, true),
(2, 'Oil Seeds', '#oil-seeds', 4, true),
(2, 'Cotton', '#cotton', 5, true);

-- Insert default footer navigation items
INSERT INTO navigation_items (name, href, location, display_order, has_dropdown, is_active) VALUES
('About Us', '#about', 'footer', 1, false, true),
('Products', '#products', 'footer', 2, false, true),
('Contact', '#contact', 'footer', 3, false, true),
('Forms', '/forms', 'footer', 4, false, true),
('Terms & Conditions', '/terms', 'footer', 5, false, true),
('Payment Terms', '/payment-terms', 'footer', 6, false, true),
('Careers', '/careers', 'footer', 7, false, true);

-- Enable realtime for these tables
alter publication supabase_realtime add table navigation_items;
alter publication supabase_realtime add table dropdown_items;
