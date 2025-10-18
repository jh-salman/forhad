'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { calculateDiscount } from '@/lib/discountEngine';
import { validateCoupon } from '@/lib/discountEngine';
import { formatBDT } from '@/lib/money';
import QuantityPicker from '@/components/QuantityPicker';
import PriceTag from '@/components/PriceTag';
import productsData from '@/data/products.json';
import discountsData from '@/data/discounts.json';

export default function CartPage() {
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
  let originalSubtotal = 0;
  
  items.forEach(item => {
    const product = productsData.find(p => p.sku === item.sku);
    if (product) {
      const pricing = calculateDiscount(product, item.quantity, discountsData, couponCode);
      subtotal += pricing.lineSubtotal;
      totalDiscount += pricing.totalSavings;
      originalSubtotal += pricing.originalSubtotal;
    }
  });
  
  const total = subtotal;
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const product = productsData.find(p => p.sku === item.sku);
            if (!product) return null;
            
            const pricing = calculateDiscount(product, item.quantity, discountsData, couponCode);
            
            return (
              <Card key={item.sku}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                        sizes="80px"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">SKU: {item.sku}</p>
                      
                      <div className="mb-3">
                        <PriceTag 
                          price={pricing.unitPrice} 
                          originalPrice={pricing.originalPrice}
                        />
                      </div>
                      
                      {pricing.appliedDiscounts.length > 0 && (
                        <div className="space-y-1">
                          {pricing.appliedDiscounts.map((discount, index) => (
                            <div key={index} className="text-xs text-green-600">
                              ✓ {discount.description}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end space-y-3">
                      <QuantityPicker
                        quantity={item.quantity}
                        onChange={(qty) => setQuantity(item.sku, qty)}
                      />
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {formatBDT(pricing.lineSubtotal)}
                        </div>
                        {pricing.totalSavings > 0 && (
                          <div className="text-sm text-green-600">
                            Save {formatBDT(pricing.totalSavings)}
                          </div>
                        )}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.sku)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Coupon Section */}
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
              
              {/* Totals */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({items.length} items):</span>
                  <span>{formatBDT(originalSubtotal)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount:</span>
                    <span>-{formatBDT(totalDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>{formatBDT(total)}</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <Button className="w-full" asChild>
                  <Link href="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" onClick={clear}>
                  Clear Cart
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Shipping Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Shipping Information</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Free shipping on orders over ৳2,000</li>
                <li>• Standard delivery: 2-3 business days</li>
                <li>• Express delivery: 1 business day</li>
                <li>• Easy returns within 7 days</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

