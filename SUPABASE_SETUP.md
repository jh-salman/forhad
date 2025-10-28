# Supabase Setup for Admin Product Management

This guide will help you set up Supabase for the admin product management functionality.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization and enter project details:
   - Name: `electro-mart` (or your preferred name)
   - Database Password: Choose a strong password
   - Region: Choose the closest region to your users
4. Click "Create new project"
5. Wait for the project to be set up (usually takes 1-2 minutes)

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## 3. Set Up Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_ADMIN_PASS=admin123
```

Replace the values with your actual Supabase credentials.

## 4. Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql` from this project
3. Paste it into the SQL Editor
4. Click **Run** to execute the schema

This will create:
- `products` table for storing product information
- `categories` table for product categories
- `discounts` table for discount rules
- `coupons` table for coupon codes
- `product_discounts` junction table
- Sample data from your existing JSON files

## 5. Set Up Storage for Images

1. In your Supabase dashboard, go to **Storage**
2. Click **Create a new bucket**
3. Name it `product-images`
4. Make it **Public** (so images can be accessed via URL)
5. Click **Create bucket**

## 6. Configure Row Level Security (RLS)

For production, you should set up Row Level Security:

1. Go to **Authentication** → **Policies**
2. Create policies for the `products` table:
   - **Select**: Allow public read access
   - **Insert/Update/Delete**: Restrict to authenticated users only

## 7. Test the Setup

1. Start your development server: `npm run dev`
2. Go to `/admin` and login with the admin password
3. Try adding a new product with an image
4. Check that products appear on the main page

## 8. Production Considerations

### Security
- Change the default admin password
- Set up proper RLS policies
- Use environment variables for all secrets
- Consider implementing proper authentication

### Performance
- Add database indexes for frequently queried fields
- Implement pagination for large product catalogs
- Use Supabase's built-in caching

### Image Storage
- Consider using a CDN for better image delivery
- Implement image optimization
- Set up proper file size limits

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Make sure your `.env.local` file is in the project root
   - Check that the variable names are exactly as shown
   - Restart your development server after adding environment variables

2. **"Failed to load products"**
   - Check that the database schema was created successfully
   - Verify your Supabase URL and key are correct
   - Check the browser console for detailed error messages

3. **Image upload not working**
   - Ensure the `product-images` bucket exists and is public
   - Check that the bucket name matches exactly in the code
   - Verify file size limits (default is 50MB)

4. **Admin login not working**
   - Check that `NEXT_PUBLIC_ADMIN_PASS` is set correctly
   - Default password is `admin123` if not set

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Look at the browser console for error messages
- Check the Supabase dashboard logs in **Logs** → **API**

## Features Included

✅ **Product Management**
- Add, edit, delete products
- Image upload with Supabase Storage
- Category management
- Stock tracking
- Product status (active/inactive)

✅ **Admin Interface**
- Secure admin login
- Product list with search and filtering
- Form validation
- Image preview and management

✅ **Database Integration**
- Real-time data from Supabase
- Proper error handling
- Loading states
- Fallback to empty state

✅ **Image Storage**
- Upload images to Supabase Storage
- Generate public URLs
- Support for multiple product images
- Image preview in admin interface
