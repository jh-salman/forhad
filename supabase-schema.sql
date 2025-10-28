-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  category TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  description TEXT,
  image TEXT, -- Main product image URL
  images TEXT[], -- Array of all product image URLs
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create discounts table
CREATE TABLE IF NOT EXISTS discounts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('percentage', 'fixed', 'override')),
  value DECIMAL(10,2) NOT NULL,
  sku TEXT, -- For SKU-specific discounts
  min_quantity INTEGER DEFAULT 1,
  max_uses INTEGER, -- Maximum number of times this discount can be used
  used_count INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('percentage', 'fixed')),
  value DECIMAL(10,2) NOT NULL,
  min_order_amount DECIMAL(10,2) DEFAULT 0,
  max_discount DECIMAL(10,2), -- Maximum discount amount
  max_uses INTEGER, -- Maximum number of times this coupon can be used
  used_count INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_discounts junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS product_discounts (
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  discount_id INTEGER REFERENCES discounts(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, discount_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_discounts_sku ON discounts(sku);
CREATE INDEX IF NOT EXISTS idx_discounts_is_active ON discounts(is_active);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_is_active ON coupons(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_discounts_updated_at BEFORE UPDATE ON discounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample categories
INSERT INTO categories (name, description) VALUES
  ('Tripod', 'Camera tripods and supports'),
  ('Microphone', 'Audio recording equipment'),
  ('Accessories', 'Camera and audio accessories'),
  ('Headset', 'Audio headsets and headphones')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products (migrating from existing JSON data)
INSERT INTO products (id, sku, name, price, category, stock, description, image, images, is_active) VALUES
  ('p1', 'ULT44', 'Ulanzi T-44 Tripod', 1650.00, 'Tripod', 20, 'Portable T-44 travel tripod with adjustable height and compact design.', '/images/img1.1.jpeg', ARRAY['/images/img1.1.jpeg', '/images/img1.2.jpeg'], true),
  ('p2', 'ULA100', 'Ulanzi A100', 3090.00, 'Accessories', 15, 'Ulanzi A100 versatile accessory with multiple mounting options.', '/images/img2.1.jpeg', ARRAY['/images/img2.1.jpeg', '/images/img-2.2.jpeg'], true),
  ('p3', 'UWM10', 'ULANZI WM-10 Microphone', 1550.00, 'Microphone', 25, 'Compact wireless mic WM-10 with excellent sound quality and long battery life.', '/images/img3.1.jpeg', ARRAY['/images/img3.1.jpeg', '/images/img3.2.jpeg'], true),
  ('p4', 'SX21', 'Sx21 Wireless Microphone', 1399.00, 'Microphone', 30, 'Sx21 dual-channel wireless mic with noise cancellation and clear audio transmission.', '/images/img4.1.jpeg', ARRAY['/images/img4.1.jpeg', '/images/img4.2.jpeg', '/images/img4.3.jpeg'], true),
  ('p5', 'F112', 'F11-2 Wireless Microphone', 1349.00, 'Microphone', 18, 'F11-2 budget wireless microphone with professional sound quality and easy setup.', '/images/img5.1.jpeg', ARRAY['/images/img5.1.jpeg', '/images/img5.2.jpeg', '/images/img5.3.jpeg'], true),
  ('p6', 'HEQ2', 'Hoco EQ2 Wireless BT Headset', 1049.00, 'Headset', 40, 'Hoco EQ2 Bluetooth headset with premium sound quality and comfortable design.', '/images/img6.1.jpeg', ARRAY['/images/img6.1.jpeg', '/images/img6.2.jpeg', '/images/img6.3.jpeg'], true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample discounts
INSERT INTO discounts (name, type, value, sku, is_active) VALUES
  ('Special ULT44 Price', 'override', 1650.00, 'ULT44', true),
  ('Special UWM10 Price', 'override', 1550.00, 'UWM10', true),
  ('Special SX21 Price', 'override', 1399.00, 'SX21', true)
ON CONFLICT DO NOTHING;

-- Insert sample coupon
INSERT INTO coupons (code, type, value, is_active) VALUES
  ('ELEC5', 'percentage', 5.00, true)
ON CONFLICT (code) DO NOTHING;
