# Electro Mart - E-commerce Starter

A production-ready Next.js e-commerce starter built with modern technologies and best practices.

## Features

- **Next.js 14+** with App Router
- **Tailwind CSS** for styling
- **shadcn/ui** components (Button, Card, Badge, Input, Sheet, Tabs)
- **Zustand** for state management
- **BDT Currency** support (৳)
- **SEO optimized** with proper metadata and OG tags
- **Mobile-first responsive** design
- **Accessibility** features (semantic HTML, alt text, focus states)

## Project Structure

```
src/
├── app/
│   ├── (store)/
│   │   ├── page.js              # Home page
│   │   ├── cart/page.js         # Shopping cart
│   │   ├── checkout/page.js     # Checkout process
│   │   └── products/[slug]/     # Product details
│   ├── admin/page.js            # Admin panel
│   ├── layout.js                # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── Header.jsx               # Site header
│   ├── Footer.jsx               # Site footer
│   ├── ProductCard.jsx          # Product display card
│   ├── PriceTag.jsx             # Price display component
│   ├── QuantityPicker.jsx       # Quantity selector
│   └── CartDrawer.jsx           # Mobile cart drawer
├── lib/
│   ├── money.js                 # Currency formatting
│   ├── slugify.js               # URL slug generation
│   ├── search.js                # Product search/filter
│   └── discountEngine.js        # Discount calculation
├── store/
│   └── cartStore.js             # Zustand cart store
└── data/
    ├── products.json            # Product catalog
    └── discounts.json           # Discount rules
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file:
   ```
   NEXT_PUBLIC_ADMIN_PASS=admin123
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features Overview

### Store Pages

- **Home Page (`/`)**: Hero section, product grid, search, and category filters
- **Product Details (`/products/[slug]`)**: Product information, pricing, quantity selector, add to cart
- **Cart (`/cart`)**: View cart items, update quantities, apply coupons, view totals
- **Checkout (`/checkout`)**: Customer information form, order summary, demo order placement

### Admin Panel (`/admin`)

- **Password Protection**: Access controlled by `NEXT_PUBLIC_ADMIN_PASS` environment variable
- **Products Management**: Edit product catalog via JSON interface
- **Discounts Management**: Configure discount rules, eligible SKUs, and coupon codes
- **Real-time Preview**: See changes immediately without page reload

### Discount Engine

The discount system supports:

- **Eligible SKUs**: Mark specific products for global discounts
- **Global Discounts**: Percentage or fixed amount discounts
- **Price Overrides**: Set specific target prices for individual products
- **Coupon Codes**: Additional percentage discounts (e.g., "ELEC5" for 5% off)

### Cart Features

- **Persistent Storage**: Cart state saved in localStorage
- **Real-time Updates**: Instant price calculations with discounts
- **Mobile-friendly**: Sheet drawer for mobile cart access
- **Quantity Management**: Easy quantity adjustment with validation

## Sample Data

The project includes 6 sample products:

1. **Ulanzi T-44 Tripod** (৳1,650) - Tripod category
2. **Ulanzi A100** (৳3,090) - Accessories category  
3. **ULANZI WM-10 Microphone** (৳1,550) - Microphone category
4. **Sx21 Wireless Microphone** (৳1,399) - Microphone category
5. **F11-2 Wireless Microphone** (৳1,349) - Microphone category
6. **Hoco EQ2 Wireless BT Headset** (৳1,049) - Headset category

## Discount Examples

- **Eligible SKUs**: ULT44, UWM10, SX21 can receive global discounts
- **Coupon Code**: "ELEC5" provides 5% additional discount
- **Price Overrides**: Set specific target prices for individual products

## Technologies Used

- **Next.js 14+** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Zustand** - Lightweight state management
- **Lucide React** - Beautiful icons
- **JavaScript** - No TypeScript (as requested)

## Browser Support

- Modern browsers with ES6+ support
- Mobile-responsive design
- Touch-friendly interfaces

## Development

- **Hot Reload**: Instant updates during development
- **ESLint**: Code quality and consistency
- **Tailwind CSS**: Utility-first styling
- **Component-based**: Reusable UI components

## Production Deployment

This starter is ready for production deployment on platforms like:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## License

This project is open source and available under the MIT License.# Electro Mart - E-commerce Application

A modern, production-ready Next.js e-commerce application built with React, Tailwind CSS, and Zustand for state management.

## 🚀 Live Demo

Visit the live application: [Electro Mart](https://forhad.vercel.app)

## ✨ Features

- **Modern Tech Stack**: Next.js 14+ with App Router, Tailwind CSS, shadcn/ui
- **Product Catalog**: 6 sample products with multiple images per product
- **Shopping Cart**: Persistent cart with localStorage, quantity management
- **Advanced Discounts**: Flexible discount engine with eligible SKUs, coupons, and price overrides
- **Admin Panel**: Password-protected admin interface for managing products and discounts
- **Responsive Design**: Mobile-first design that works on all devices
- **SEO Optimized**: Proper metadata, Open Graph tags, and semantic HTML
- **BDT Currency**: All prices displayed in Bangladeshi Taka (৳)

## 🛍️ Products

1. **Ulanzi T-44 Tripod** - ৳1,650 (Tripod)
2. **Ulanzi A100** - ৳3,090 (Accessories)
3. **ULANZI WM-10 Microphone** - ৳1,550 (Microphone)
4. **Sx21 Wireless Microphone** - ৳1,399 (Microphone)
5. **F11-2 Wireless Microphone** - ৳1,349 (Microphone)
6. **Hoco EQ2 Wireless BT Headset** - ৳1,049 (Headset)

## 🎯 Key Features

### Store Pages
- **Home Page**: Product grid with search and category filtering
- **Product Details**: Image gallery, pricing, quantity selector, add to cart
- **Shopping Cart**: Editable quantities, coupon codes, real-time totals
- **Checkout**: Customer information form with demo order placement

### Admin Panel
- **Password Protection**: Secure admin access
- **Product Management**: JSON-based product catalog editing
- **Discount Management**: Configure discount rules and coupon codes
- **Real-time Preview**: See changes immediately

### Discount System
- **Eligible SKUs**: Mark products for global discounts
- **Global Discounts**: Percentage or fixed amount discounts
- **Price Overrides**: Set specific target prices for individual products
- **Coupon Codes**: Additional discounts (e.g., "ELEC5" for 5% off)

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Button, Card, Badge, Input, Sheet, Tabs)
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **Language**: JavaScript (no TypeScript)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jh-salman/forhad.git
   cd forhad
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```
   NEXT_PUBLIC_ADMIN_PASS=admin123
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.js            # Home page
│   ├── cart/page.js       # Shopping cart
│   ├── checkout/page.js   # Checkout process
│   ├── products/[slug]/   # Product details
│   └── admin/page.js      # Admin panel
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Header.jsx        # Site header
│   ├── Footer.jsx        # Site footer
│   ├── ProductCard.jsx   # Product display
│   ├── ProductGallery.jsx # Image gallery
│   └── ...
├── lib/                  # Utility functions
│   ├── money.js          # Currency formatting
│   ├── discountEngine.js # Discount calculations
│   └── ...
├── store/                # Zustand stores
│   └── cartStore.js      # Cart state management
└── data/                 # Sample data
    ├── products.json     # Product catalog
    └── discounts.json    # Discount rules
```

## 🎨 Features in Detail

### Image Gallery
- Multiple images per product (2-3 images each)
- Interactive gallery with navigation arrows
- Thumbnail navigation
- Responsive design

### Cart Functionality
- Add/remove items
- Quantity adjustment
- Persistent storage
- Real-time price calculations
- Coupon code support

### Discount Engine
- Flexible discount rules
- Multiple discount types (percentage, fixed, overrides)
- Coupon code validation
- Real-time price updates

## 🔧 Admin Access

- **URL**: `/admin`
- **Password**: `admin123` (configurable via environment variable)
- **Features**: Edit products and discounts via JSON interface

## 📱 Responsive Design

- Mobile-first approach
- Touch-friendly interfaces
- Optimized for all screen sizes
- Progressive Web App ready

## 🚀 Deployment

The application is deployed on Vercel and can be accessed at:
**https://forhad.vercel.app**

### Deploy to Vercel

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Set environment variables**
   - `NEXT_PUBLIC_ADMIN_PASS`: Admin password

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

**Electro Mart** - Your trusted source for electronics and accessories! 🛒
