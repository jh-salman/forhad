/**
 * Simple search function for products
 * @param {Array} products - Array of products to search
 * @param {string} query - Search query
 * @returns {Array} Filtered products
 */
export function searchProducts(products, query) {
  if (!query || query.trim() === '') {
    return products;
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.sku.toLowerCase().includes(searchTerm)
  );
}

/**
 * Filter products by category
 * @param {Array} products - Array of products to filter
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered products
 */
export function filterByCategory(products, category) {
  if (!category || category === 'all') {
    return products;
  }
  
  return products.filter(product => product.category === category);
}

/**
 * Get unique categories from products
 * @param {Array} products - Array of products
 * @returns {Array} Array of unique categories
 */
export function getCategories(products) {
  const categories = products.map(product => product.category);
  return [...new Set(categories)].sort();
}

