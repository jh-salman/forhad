-- Create RLS policies for public access
-- This is more secure than disabling RLS completely

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE discounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_discounts ENABLE ROW LEVEL SECURITY;

-- Products table policies
CREATE POLICY "Allow public read access on products" ON products
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on products" ON products
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on products" ON products
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on products" ON products
    FOR DELETE USING (true);

-- Categories table policies
CREATE POLICY "Allow public read access on categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on categories" ON categories
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on categories" ON categories
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on categories" ON categories
    FOR DELETE USING (true);

-- Discounts table policies
CREATE POLICY "Allow public read access on discounts" ON discounts
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on discounts" ON discounts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on discounts" ON discounts
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on discounts" ON discounts
    FOR DELETE USING (true);

-- Coupons table policies
CREATE POLICY "Allow public read access on coupons" ON coupons
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on coupons" ON coupons
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on coupons" ON coupons
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on coupons" ON coupons
    FOR DELETE USING (true);

-- Product_discounts table policies
CREATE POLICY "Allow public read access on product_discounts" ON product_discounts
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on product_discounts" ON product_discounts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on product_discounts" ON product_discounts
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on product_discounts" ON product_discounts
    FOR DELETE USING (true);
