import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

/**
 * QuantityPicker component for adjusting item quantities
 * @param {Object} props
 * @param {number} props.quantity - Current quantity
 * @param {Function} props.onChange - Callback when quantity changes
 * @param {number} props.min - Minimum quantity (default: 1)
 * @param {number} props.max - Maximum quantity (default: 99)
 * @param {string} props.className - Additional CSS classes
 */
export default function QuantityPicker({ 
  quantity, 
  onChange, 
  min = 1, 
  max = 99, 
  className = '' 
}) {
  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };
  
  const handleIncrease = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="h-8 w-8 p-0"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <span className="w-8 text-center font-medium">
        {quantity}
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="h-8 w-8 p-0"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

