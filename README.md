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

This project is open source and available under the MIT License.# forhad
