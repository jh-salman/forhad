'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Save, Eye, EyeOff } from 'lucide-react';
import productsData from '@/data/products.json';
import discountsData from '@/data/discounts.json';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  
  // Data states
  const [products, setProducts] = useState(productsData);
  const [discounts, setDiscounts] = useState(discountsData);
  const [productsJson, setProductsJson] = useState(JSON.stringify(productsData, null, 2));
  const [discountsJson, setDiscountsJson] = useState(JSON.stringify(discountsData, null, 2));
  
  // Validation states
  const [productsError, setProductsError] = useState('');
  const [discountsError, setDiscountsError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASS || 'admin123';
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Invalid password');
    }
  };
  
  const validateJson = (jsonString, type) => {
    try {
      const parsed = JSON.parse(jsonString);
      
      if (type === 'products') {
        if (!Array.isArray(parsed)) {
          return 'Products must be an array';
        }
        
        for (const product of parsed) {
          if (!product.id || !product.sku || !product.name || !product.price) {
            return 'Each product must have id, sku, name, and price';
          }
          if (typeof product.price !== 'number' || product.price < 0) {
            return 'Product price must be a positive number';
          }
        }
      } else if (type === 'discounts') {
        if (typeof parsed !== 'object') {
          return 'Discounts must be an object';
        }
        
        if (!Array.isArray(parsed.eligibleSkus)) {
          return 'eligibleSkus must be an array';
        }
        
        if (parsed.global && typeof parsed.global !== 'object') {
          return 'global must be an object';
        }
        
        if (parsed.overrides && !Array.isArray(parsed.overrides)) {
          return 'overrides must be an array';
        }
        
        if (parsed.coupons && !Array.isArray(parsed.coupons)) {
          return 'coupons must be an array';
        }
      }
      
      return '';
    } catch (error) {
      return 'Invalid JSON format';
    }
  };
  
  const handleProductsChange = (value) => {
    setProductsJson(value);
    const error = validateJson(value, 'products');
    setProductsError(error);
  };
  
  const handleDiscountsChange = (value) => {
    setDiscountsJson(value);
    const error = validateJson(value, 'discounts');
    setDiscountsError(error);
  };
  
  const handleSave = (type) => {
    const jsonString = type === 'products' ? productsJson : discountsJson;
    const error = validateJson(jsonString, type);
    
    if (error) {
      alert(`Validation error: ${error}`);
      return;
    }
    
    try {
      const parsed = JSON.parse(jsonString);
      
      if (type === 'products') {
        setProducts(parsed);
        setSaveMessage('Products updated successfully!');
      } else {
        setDiscounts(parsed);
        setSaveMessage('Discounts updated successfully!');
      }
      
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      alert('Error parsing JSON');
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Lock className="h-12 w-12 text-gray-600" />
              </div>
              <CardTitle>Admin Access</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
              <p className="text-xs text-gray-500 text-center mt-4">
                Default password: admin123
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <Button
          variant="outline"
          onClick={() => setIsAuthenticated(false)}
        >
          Logout
        </Button>
      </div>
      
      {saveMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {saveMessage}
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="discounts">Discounts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Products Management</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline">
                    {products.length} products
                  </Badge>
                  <Button
                    onClick={() => handleSave('products')}
                    disabled={!!productsError}
                    size="sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Simulate Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {productsError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                  {productsError}
                </div>
              )}
              <textarea
                value={productsJson}
                onChange={(e) => handleProductsChange(e.target.value)}
                className="w-full h-96 p-4 border rounded-lg font-mono text-sm"
                placeholder="Enter products JSON..."
              />
            </CardContent>
          </Card>
          
          {/* Products Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Products Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.slice(0, 6).map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                    <p className="text-sm text-gray-600">Price: ৳{product.price}</p>
                    <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                    <Badge variant="outline" className="mt-2">
                      {product.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="discounts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Discounts Management</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline">
                    {discounts.eligibleSkus?.length || 0} eligible SKUs
                  </Badge>
                  <Button
                    onClick={() => handleSave('discounts')}
                    disabled={!!discountsError}
                    size="sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Simulate Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {discountsError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                  {discountsError}
                </div>
              )}
              <textarea
                value={discountsJson}
                onChange={(e) => handleDiscountsChange(e.target.value)}
                className="w-full h-96 p-4 border rounded-lg font-mono text-sm"
                placeholder="Enter discounts JSON..."
              />
            </CardContent>
          </Card>
          
          {/* Discounts Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Discounts Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Eligible SKUs:</h4>
                <div className="flex flex-wrap gap-2">
                  {discounts.eligibleSkus?.map((sku) => (
                    <Badge key={sku} variant="secondary">{sku}</Badge>
                  ))}
                </div>
              </div>
              
              {discounts.global && (
                <div>
                  <h4 className="font-semibold mb-2">Global Discount:</h4>
                  <p className="text-sm text-gray-600">
                    {discounts.global.percent ? `${discounts.global.percent}% off` : 
                     discounts.global.fixed ? `৳${discounts.global.fixed} off` : 'None'}
                  </p>
                </div>
              )}
              
              {discounts.overrides && discounts.overrides.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Price Overrides:</h4>
                  <div className="space-y-2">
                    {discounts.overrides.map((override, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        <strong>{override.sku}:</strong> ৳{override.targetPrice}
                        {override.note && <span className="text-gray-500"> - {override.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {discounts.coupons && discounts.coupons.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Coupon Codes:</h4>
                  <div className="space-y-2">
                    {discounts.coupons.map((coupon, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        <strong>{coupon.code}:</strong> {coupon.percent}% off
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

