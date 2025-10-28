-- Disable RLS for storage bucket access
-- This allows public uploads to the product-images bucket

-- First, let's check if there are any existing policies on the storage bucket
-- and then create a policy that allows public access

-- Create a policy for the product-images bucket to allow public uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-images', 'product-images', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

-- Create policy to allow public access to storage objects
CREATE POLICY "Allow public access to product images" ON storage.objects
FOR ALL USING (bucket_id = 'product-images');

-- Alternative: If the above doesn't work, try this more permissive policy
-- CREATE POLICY "Allow all operations on product-images" ON storage.objects
-- FOR ALL USING (true);

-- Grant necessary permissions
GRANT ALL ON storage.objects TO anon, authenticated;
GRANT ALL ON storage.buckets TO anon, authenticated;
