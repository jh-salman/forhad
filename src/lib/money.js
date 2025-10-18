/**
 * Format number as BDT currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export function formatBDT(amount) {
  if (typeof amount !== 'number') {
    return '৳ 0';
  }
  
  return `৳ ${amount.toLocaleString('en-BD')}`;
}

/**
 * Calculate discount amount
 * @param {number} originalPrice - Original price
 * @param {number} discountedPrice - Discounted price
 * @returns {number} Discount amount
 */
export function calculateDiscount(originalPrice, discountedPrice) {
  return originalPrice - discountedPrice;
}

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} discountedPrice - Discounted price
 * @returns {number} Discount percentage
 */
export function calculateDiscountPercent(originalPrice, discountedPrice) {
  if (originalPrice === 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

