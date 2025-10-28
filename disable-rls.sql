-- Disable Row Level Security (RLS) for all tables
-- This allows public access to read/write data without authentication

-- Disable RLS on products table
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Disable RLS on categories table
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;

-- Disable RLS on discounts table
ALTER TABLE discounts DISABLE ROW LEVEL SECURITY;

-- Disable RLS on coupons table
ALTER TABLE coupons DISABLE ROW LEVEL SECURITY;

-- Disable RLS on product_discounts junction table
ALTER TABLE product_discounts DISABLE ROW LEVEL SECURITY;

-- Grant necessary permissions for public access
GRANT ALL ON products TO anon, authenticated;
GRANT ALL ON categories TO anon, authenticated;
GRANT ALL ON discounts TO anon, authenticated;
GRANT ALL ON coupons TO anon, authenticated;
GRANT ALL ON product_discounts TO anon, authenticated;

-- Grant usage on sequences (for auto-incrementing IDs)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
