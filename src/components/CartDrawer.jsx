'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { calculateDiscount } from '@/lib/discountEngine';
import { validateCoupon } from '@/lib/discountEngine';
import { formatBDT } from '@/lib/money';
import QuantityPicker from './QuantityPicker';
import PriceTag from './PriceTag';

// Import data (in a real app, this would come from an API)
import productsData from '@/data/products.json';
import discountsData from '@/data/discounts.json';

/**
 * CartDrawer component for displaying cart items in a drawer
 * @param {Object} props
 * @param {Function} props.onClose - Callback when drawer should close
 */
export default function CartDrawer({ onClose }) {
  const { 
    items, 
    removeItem, 
    setQuantity, 
    setCouponCode, 
    couponCode,
    clear 
  } = useCartStore();
  
  const [couponInput, setCouponInput] = useState(couponCode || '');
  const [couponMessage, setCouponMessage] = useState('');
  
  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      setCouponMessage('Please enter a coupon code');
      return;
    }
    
    const validation = validateCoupon(couponInput.trim(), discountsData);
    if (validation.valid) {
      setCouponCode(couponInput.trim());
      setCouponMessage(validation.message);
    } else {
      setCouponMessage(validation.message);
    }
  };
  
  const handleRemoveCoupon = () => {
    setCouponCode(null);
    setCouponInput('');
    setCouponMessage('');
  };
  
  // Calculate totals
  let subtotal = 0;
  let totalDiscount = 0;
  
  items.forEach(item => {
    const product = productsData.find(p => p.sku === item.sku);
    if (product) {
      const pricing = calculateDiscount(product, item.quantity, discountsData, couponCode);
      subtotal += pricing.lineSubtotal;
      totalDiscount += pricing.totalSavings;
    }
  });
  
  const total = subtotal;
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600 mb-4">Add some products to get started</p>
        <Button onClick={onClose} asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {items.map((item) => {
            const product = productsData.find(p => p.sku === item.sku);
            if (!product) return null;
            
            const pricing = calculateDiscount(product, item.quantity, discountsData, couponCode);
            
            return (
              <div key={item.sku} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                    sizes="64px"
                    unoptimized
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                  
                  <div className="mt-2">
                    <PriceTag 
                      price={pricing.unitPrice} 
                      originalPrice={pricing.originalPrice}
                      className="text-sm"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <QuantityPicker
                    quantity={item.quantity}
                    onChange={(qty) => setQuantity(item.sku, qty)}
                    className="scale-75"
                  />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.sku)}
                    className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Coupon Section */}
      <div className="border-t p-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Coupon Code</label>
          <div className="flex space-x-2">
            <Input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1"
            />
            <Button onClick={handleApplyCoupon} size="sm">
              Apply
            </Button>
          </div>
          {couponMessage && (
            <p className={`text-xs ${couponMessage.includes('applied') ? 'text-green-600' : 'text-red-600'}`}>
              {couponMessage}
            </p>
          )}
          {couponCode && (
            <div className="flex items-center justify-between">
              <Badge variant="secondary">Applied: {couponCode}</Badge>
              <Button variant="ghost" size="sm" onClick={handleRemoveCoupon}>
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Totals */}
      <div className="border-t p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>{formatBDT(subtotal + totalDiscount)}</span>
        </div>
        {totalDiscount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount:</span>
            <span>-{formatBDT(totalDiscount)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>{formatBDT(total)}</span>
        </div>
        
        <div className="space-y-2 pt-2">
          <Button className="w-full" asChild>
            <Link href="/cart" onClick={onClose}>
              View Cart
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/checkout" onClick={onClose}>
              Checkout
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
