import { formatBDT } from '@/lib/money';

/**
 * PriceTag component for displaying product prices
 * @param {Object} props
 * @param {number} props.price - Current price
 * @param {number} props.originalPrice - Original price (for showing discount)
 * @param {string} props.className - Additional CSS classes
 */
export default function PriceTag({ price, originalPrice, className = '' }) {
  const hasDiscount = originalPrice && originalPrice > price;
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-lg font-semibold text-gray-900">
        {formatBDT(price)}
      </span>
      {hasDiscount && (
        <span className="text-sm text-gray-500 line-through">
          {formatBDT(originalPrice)}
        </span>
      )}
      {hasDiscount && (
        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
          {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
        </span>
      )}
    </div>
  );
}

