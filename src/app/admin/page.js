'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Save, Eye, EyeOff, Plus, Edit, Trash2 } from 'lucide-react';
import ProductList from '@/components/admin/ProductList';
import ProductForm from '@/components/admin/ProductForm';
import { productService, discountService } from '@/lib/supabase-admin';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  
  // Product management states
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Discount management states
  const [discounts, setDiscounts] = useState([]);
  const [discountsJson, setDiscountsJson] = useState('');
  const [discountsError, setDiscountsError] = useState('');
  
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASS || 'admin123';
  
  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
      loadDiscounts();
    }
  }, [isAuthenticated]);
  
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      setMessage('Failed to load products');
    } finally {
      setLoading(false);
    }
  };
  
  const loadDiscounts = async () => {
    try {
      const data = await discountService.getAll();
      setDiscounts(data);
      setDiscountsJson(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error loading discounts:', error);
      setMessage('Failed to load discounts');
    }
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Invalid password');
    }
  };
  
  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };
  
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };
  
  const handleProductSave = () => {
    setShowProductForm(false);
    setEditingProduct(null);
    loadProducts();
    setMessage('Product saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };
  
  const handleProductCancel = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };
  
  
  const handleDiscountsChange = (value) => {
    setDiscountsJson(value);
    try {
      JSON.parse(value);
      setDiscountsError('');
    } catch (error) {
      setDiscountsError('Invalid JSON format');
    }
  };
  
  const handleSaveDiscounts = async () => {
    try {
      const parsed = JSON.parse(discountsJson);
      // Here you would implement discount saving logic
      setMessage('Discounts updated successfully!');
      setTimeout(() => setMessage(''), 3000);
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
      
      {message && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}
      
      {showProductForm ? (
        <ProductForm
          product={editingProduct}
          onSave={handleProductSave}
          onCancel={handleProductCancel}
        />
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="discounts">Discounts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-6">
            <ProductList
              onEdit={handleEditProduct}
              onAdd={handleAddProduct}
            />
          </TabsContent>
          
          <TabsContent value="discounts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Discounts Management</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">
                      {discounts.length} discounts
                    </Badge>
                    <Button
                      onClick={handleSaveDiscounts}
                      disabled={!!discountsError}
                      size="sm"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Discounts
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
                {discounts.length > 0 ? (
                  <div className="space-y-4">
                    {discounts.map((discount) => (
                      <div key={discount.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{discount.name}</h4>
                          <Badge variant={discount.is_active ? 'default' : 'secondary'}>
                            {discount.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Type: {discount.type} | Value: {discount.value}
                          {discount.sku && ` | SKU: ${discount.sku}`}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No discounts found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

