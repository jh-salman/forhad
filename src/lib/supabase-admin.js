import { supabase } from './supabase'

// Products CRUD operations
export const productService = {
  // Get all products
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get product by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Get product by SKU
  async getBySku(sku) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('sku', sku)
      .single()
    
    if (error) throw error
    return data
  },

  // Create new product
  async create(product) {
    console.log('Creating product with data:', product);
    
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase create error:', error);
      throw error;
    }
    
    console.log('Product created successfully:', data);
    return data
  },

  // Update product
  async update(id, updates) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete product
  async delete(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Upload product image
  async uploadImage(file, productId) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${productId}-${Date.now()}.${fileExt}`
    const filePath = `products/${fileName}`

    console.log('Uploading image to path:', filePath)

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Upload error:', uploadError)
      throw uploadError
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath)

    console.log('Image uploaded successfully:', data.publicUrl)
    return data.publicUrl
  }
}

// Discounts CRUD operations
export const discountService = {
  // Get all discounts
  async getAll() {
    const { data, error } = await supabase
      .from('discounts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get discount by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('discounts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create new discount
  async create(discount) {
    const { data, error } = await supabase
      .from('discounts')
      .insert([discount])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update discount
  async update(id, updates) {
    const { data, error } = await supabase
      .from('discounts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete discount
  async delete(id) {
    const { error } = await supabase
      .from('discounts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Categories CRUD operations
export const categoryService = {
  // Get all categories
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Create new category
  async create(category) {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}
