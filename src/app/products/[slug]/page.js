'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, Package, Truck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { calculateDiscount } from '@/lib/discountEngine';
import { formatBDT } from '@/lib/money';
import PriceTag from '@/components/PriceTag';
import QuantityPicker from '@/components/QuantityPicker';
import ProductGallery from '@/components/ProductGallery';
import productsData from '@/data/products.json';
import discountsData from '@/data/discounts.json';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find product by slug
    const foundProduct = productsData.find(p => {
      const slug = p.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
      return slug === params.slug;
    });
    
    setProduct(foundProduct);
    setLoading(false);
  }, [params.slug]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const pricing = calculateDiscount(product, quantity, discountsData);
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      sku: product.sku,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    // You could add a toast notification here
    alert(`${product.name} added to cart!`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>
      
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Gallery */}
        <div className="space-y-4">
          <ProductGallery 
            images={product.images || [product.image]} 
            alt={product.name} 
          />
          
          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 text-lg">
              {product.description}
            </p>
          </div>
          
          {/* Pricing */}
          <div className="space-y-2">
            <PriceTag 
              price={pricing.unitPrice} 
              originalPrice={pricing.originalPrice}
              className="text-2xl"
            />
            {pricing.appliedDiscounts.length > 0 && (
              <div className="space-y-1">
                {pricing.appliedDiscounts.map((discount, index) => (
                  <div key={index} className="text-sm text-green-600">
                    ✓ {discount.description}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* SKU */}
          <div className="text-sm text-gray-600">
            <strong>SKU:</strong> {product.sku}
          </div>
          
          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <QuantityPicker
                quantity={quantity}
                onChange={setQuantity}
                max={product.stock}
              />
            </div>
            
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              size="lg"
              className="w-full"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
          
          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Product Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-green-600" />
                  Free shipping on orders over ৳2,000
                </li>
                <li className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  Fast delivery within 2-3 business days
                </li>
                <li className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-purple-600" />
                  Easy returns within 7 days
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
