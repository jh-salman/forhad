/**
 * Discount Engine - Calculate pricing with various discount rules
 * @param {Object} product - Product object with sku and price
 * @param {number} quantity - Quantity of items
 * @param {Object} discountsConfig - Discount configuration
 * @param {string} couponCode - Optional coupon code
 * @returns {Object} Pricing result with unitPrice, lineSubtotal, and savings
 */
export function calculateDiscount(product, quantity, discountsConfig, couponCode = null) {
  const { sku, price: originalPrice } = product;
  let unitPrice = originalPrice;
  let appliedDiscounts = [];
  
  // Step 1: Check for override with targetPrice
  const override = discountsConfig.overrides?.find(o => o.sku === sku);
  if (override && override.targetPrice) {
    unitPrice = override.targetPrice;
    appliedDiscounts.push({
      type: 'override',
      amount: originalPrice - override.targetPrice,
      description: `Special price: ${override.note || 'Override applied'}`
    });
  }
  // Step 2: Check if eligible for global discount
  else if (discountsConfig.eligibleSkus?.includes(sku)) {
    const global = discountsConfig.global;
    
    if (global?.percent && global.percent > 0) {
      const discountAmount = (originalPrice * global.percent) / 100;
      unitPrice = originalPrice - discountAmount;
      appliedDiscounts.push({
        type: 'global_percent',
        amount: discountAmount,
        description: `${global.percent}% discount`
      });
    } else if (global?.fixed && global.fixed > 0) {
      unitPrice = Math.max(0, originalPrice - global.fixed);
      appliedDiscounts.push({
        type: 'global_fixed',
        amount: Math.min(global.fixed, originalPrice),
        description: `৳${global.fixed} off`
      });
    }
  }
  
  // Step 3: Apply coupon discount on already discounted price
  if (couponCode && discountsConfig.coupons) {
    const coupon = discountsConfig.coupons.find(c => c.code === couponCode);
    if (coupon && coupon.percent > 0) {
      const couponDiscount = (unitPrice * coupon.percent) / 100;
      const newUnitPrice = unitPrice - couponDiscount;
      appliedDiscounts.push({
        type: 'coupon',
        amount: couponDiscount,
        description: `Coupon ${couponCode}: ${coupon.percent}% off`
      });
      unitPrice = newUnitPrice;
    }
  }
  
  // Calculate totals
  const lineSubtotal = unitPrice * quantity;
  const originalSubtotal = originalPrice * quantity;
  const totalSavings = originalSubtotal - lineSubtotal;
  
  return {
    unitPrice: Math.round(unitPrice * 100) / 100, // Round to 2 decimal places
    lineSubtotal: Math.round(lineSubtotal * 100) / 100,
    originalSubtotal,
    totalSavings: Math.round(totalSavings * 100) / 100,
    appliedDiscounts,
    originalPrice
  };
}

/**
 * Validate coupon code
 * @param {string} code - Coupon code to validate
 * @param {Object} discountsConfig - Discount configuration
 * @returns {Object} Validation result
 */
export function validateCoupon(code, discountsConfig) {
  if (!code || !discountsConfig.coupons) {
    return { valid: false, message: 'Invalid coupon code' };
  }
  
  const coupon = discountsConfig.coupons.find(c => c.code === code);
  if (!coupon) {
    return { valid: false, message: 'Coupon code not found' };
  }
  
  return { 
    valid: true, 
    coupon,
    message: `Coupon applied: ${coupon.percent}% off`
  };
}

