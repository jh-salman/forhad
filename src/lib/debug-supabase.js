import { createClient } from '@supabase/supabase-js'

// Debug function to check Supabase configuration
export function debugSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('=== Supabase Configuration Debug ===')
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing')
  
  if (supabaseUrl) {
    console.log('URL format valid:', supabaseUrl.startsWith('https://') && supabaseUrl.includes('.supabase.co'))
  }
  
  if (supabaseAnonKey) {
    console.log('Key format valid:', supabaseAnonKey.startsWith('eyJ'))
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing required environment variables!')
    console.log('Please check your .env.local file contains:')
    console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
    return false
  }

  return true
}

// Test basic Supabase connection
export async function testSupabaseConnection() {
  try {
    console.log('=== Testing Supabase Connection ===')
    
    // Check configuration first
    if (!debugSupabaseConfig()) {
      return { success: false, error: 'Invalid configuration' }
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Create client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Test connection with a simple query
    console.log('Testing database connection...')
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1)

    if (error) {
      console.error('❌ Database connection failed:', error)
      return { success: false, error: error.message }
    }

    console.log('✅ Database connection successful')
    console.log('Response data:', data)

    // Test storage connection
    console.log('Testing storage connection...')
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error('❌ Storage connection failed:', bucketsError)
      return { success: false, error: `Storage error: ${bucketsError.message}` }
    }

    console.log('✅ Storage connection successful')
    console.log('Available buckets:', buckets.map(b => b.name))

    return { success: true, data: { products: data, buckets } }

  } catch (error) {
    console.error('❌ Connection test failed:', error)
    return { 
      success: false, 
      error: error.message || 'Unknown error',
      details: error
    }
  }
}

// Test network connectivity
export async function testNetworkConnectivity() {
  try {
    console.log('=== Testing Network Connectivity ===')
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl) {
      return { success: false, error: 'No Supabase URL configured' }
    }

    // Test if we can reach the Supabase API
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'HEAD',
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`
      }
    })

    console.log('Network response status:', response.status)
    console.log('Network response headers:', Object.fromEntries(response.headers.entries()))

    if (response.ok) {
      console.log('✅ Network connectivity successful')
      return { success: true }
    } else {
      console.error('❌ Network connectivity failed:', response.status, response.statusText)
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` }
    }

  } catch (error) {
    console.error('❌ Network test failed:', error)
    return { 
      success: false, 
      error: error.message || 'Network error',
      details: error
    }
  }
}
