import Link from 'next/link';

/**
 * Footer component
 */
export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-600">Electro Mart</h3>
            <p className="text-sm text-gray-600">
              Your trusted source for electronics and accessories.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/?category=Tripod" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Tripods
                </Link>
              </li>
              <li>
                <Link href="/?category=Microphone" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Microphones
                </Link>
              </li>
              <li>
                <Link href="/?category=Headset" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Headsets
                </Link>
              </li>
              <li>
                <Link href="/?category=Accessories" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Contact</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>Email: info@electromart.com</p>
              <p>Phone: +880 1234 567890</p>
              <p>Address: Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 Electro Mart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

