
import { useState } from 'react';
import { Product, ProductVariant } from '@/lib/types';
import { ShoppingCart, Plus, Minus, Package, Barcode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Get the current price and discount
  const getCurrentPrice = (): number => {
    if (selectedVariant) {
      return selectedVariant.price;
    }
    return product.price;
  };

  const getCurrentMRP = (): number | undefined => {
    if (selectedVariant) {
      return selectedVariant.mrp;
    }
    return product.originalPrice;
  };

  const getDiscountPercentage = (): number | undefined => {
    const mrp = getCurrentMRP();
    const price = getCurrentPrice();
    
    if (mrp && price && mrp > price) {
      return Math.round(((mrp - price) / mrp) * 100);
    }
    return product.discountPercentage;
  };

  const getWeightInfo = (): string => {
    if (selectedVariant) {
      return `${selectedVariant.weightValue} ${selectedVariant.weightUnit}`;
    }
    return typeof product.quantity === 'string' 
      ? `${product.quantity} ${product.unit}`
      : `${product.quantity.toString()} ${product.unit}`;
  };

  const discountPercentage = getDiscountPercentage();

  return (
    <div className="app-card relative animate-fade-in group">
      {discountPercentage && (
        <div className="app-discount-badge">
          {discountPercentage}% off
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
        {product.brand && (
          <p className="text-xs text-appgold mb-1">{product.brand}</p>
        )}
        <p className="text-sm text-gray-400 mb-2 line-clamp-1">{product.description}</p>
        
        {/* Variant selection */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-3">
            <Select 
              value={selectedVariant?.id} 
              onValueChange={(value) => {
                const variant = product.variants.find(v => v.id === value);
                setSelectedVariant(variant);
              }}
            >
              <SelectTrigger className="w-full h-8 text-sm">
                <SelectValue placeholder="Select Variant" />
              </SelectTrigger>
              <SelectContent>
                {product.variants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id}>
                    {variant.weightValue} {variant.weightUnit} - ₹{variant.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              {getCurrentMRP() && getCurrentMRP() !== getCurrentPrice() && (
                <span className="app-price-original">₹{getCurrentMRP()}</span>
              )}
              <span className="app-price-discounted text-xl">₹{getCurrentPrice()}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {getWeightInfo()}
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
        
        {selectedVariant && selectedVariant.barcode && (
          <div className="flex items-center text-xs text-gray-400 mb-2">
            <Barcode size={14} className="mr-1" />
            <span>{selectedVariant.barcode}</span>
          </div>
        )}
        
        <Button 
          onClick={handleAddToCart} 
          className="w-full app-button group-hover:bg-opacity-100"
          disabled={selectedVariant ? selectedVariant.stock <= 0 : false}
        >
          <ShoppingCart size={18} className="mr-2" />
          {selectedVariant && selectedVariant.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
