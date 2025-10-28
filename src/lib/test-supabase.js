import { supabase } from './supabase'

export async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...')
    
    // Test basic connection
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection error:', error)
      return { success: false, error }
    }
    
    console.log('Supabase connection successful')
    return { success: true, data }
    
  } catch (error) {
    console.error('Supabase test failed:', error)
    return { success: false, error }
  }
}

export async function testProductInsert() {
  try {
    console.log('Testing product insert...')
    
    const testProduct = {
      id: `test-${Date.now()}`,
      sku: `TEST-${Date.now()}`,
      name: 'Test Product',
      price: 100.00,
      category: 'Test',
      stock: 1,
      description: 'Test product for debugging',
      image: '',
      images: [],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('products')
      .insert([testProduct])
      .select()
      .single()
    
    if (error) {
      console.error('Product insert error:', error)
      return { success: false, error }
    }
    
    console.log('Product insert successful:', data)
    
    // Clean up test product
    await supabase
      .from('products')
      .delete()
      .eq('id', testProduct.id)
    
    return { success: true, data }
    
  } catch (error) {
    console.error('Product insert test failed:', error)
    return { success: false, error }
  }
}
