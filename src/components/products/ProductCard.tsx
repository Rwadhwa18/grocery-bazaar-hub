
import { useState } from 'react';
import { Product } from '@/lib/types';
import { ShoppingCart, Plus, Minus, Package } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
      duration: 3000,
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="app-card relative animate-fade-in group">
      {product.discountPercentage && (
        <div className="app-discount-badge">
          {product.discountPercentage}% off
        </div>
      )}
      
      <div className="p-3 rounded-t-lg bg-appgray relative overflow-hidden h-44 flex items-center justify-center">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Package size={64} className="text-gray-600" />
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-appfg line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-2 line-clamp-1">{product.description}</p>
        
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              {product.originalPrice && (
                <span className="app-price-original">₹{product.originalPrice}</span>
              )}
              <span className="app-price-discounted text-xl">₹{product.price}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {product.quantity} {product.unit}
            </div>
          </div>
          
          <div className="flex items-center border border-appgray rounded-md">
            <button
              onClick={decrementQuantity}
              className="p-1 hover:bg-appgray/50 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-2 min-w-[30px] text-center">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="p-1 hover:bg-appgray/50 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        <Button onClick={handleAddToCart} className="w-full app-button group-hover:bg-opacity-100">
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
