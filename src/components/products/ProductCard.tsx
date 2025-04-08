
import { useState } from 'react';
import { Product, ProductVariant } from '@/lib/types';
import { ShoppingCart, Plus, Minus, Package, Barcode, Check } from 'lucide-react';
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
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    // Show added confirmation briefly
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
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

  const isOutOfStock = (): boolean => {
    if (selectedVariant) {
      return selectedVariant.stock <= 0;
    }
    return false;
  };

  const stockMessage = (): string => {
    if (!selectedVariant) return '';
    if (selectedVariant.stock <= 0) return 'Out of stock';
    if (selectedVariant.stock < 5) return `Only ${selectedVariant.stock} left`;
    return '';
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
        
        {product.isVeg !== undefined && (
          <div 
            className={`absolute top-2 right-2 w-5 h-5 rounded-sm ${product.isVeg ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center`}
          >
            <div className="w-3 h-3 rounded-sm bg-appbg"></div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-appfg line-clamp-1">{product.name}</h3>
        {product.brand && (
          <p className="text-xs text-appgold mb-1">{product.brand}</p>
        )}
        <p className="text-sm text-gray-400 mb-2 line-clamp-1">{product.description}</p>
        
        {/* Variant selection */}
        {product.variants && product.variants.length > 1 && (
          <div className="mb-3">
            <Select 
              value={selectedVariant?.id} 
              onValueChange={(value) => {
                const variant = product.variants.find(v => v.id === value);
                setSelectedVariant(variant);
                // Reset quantity when variant changes
                setQuantity(1);
              }}
            >
              <SelectTrigger className="w-full h-8 text-sm">
                <SelectValue placeholder="Select Variant" />
              </SelectTrigger>
              <SelectContent>
                {product.variants.map((variant) => (
                  <SelectItem 
                    key={variant.id} 
                    value={variant.id}
                    disabled={variant.stock <= 0}
                  >
                    {variant.weightValue} {variant.weightUnit} - ₹{variant.price}
                    {variant.stock <= 0 && " (Out of stock)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="flex items-end justify-between mb-2">
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
              disabled={isOutOfStock()}
            >
              <Minus size={16} />
            </button>
            <span className="px-2 min-w-[30px] text-center">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="p-1 hover:bg-appgray/50 transition-colors"
              aria-label="Increase quantity"
              disabled={isOutOfStock()}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        {stockMessage() && (
          <div className={`text-xs mb-2 ${
            selectedVariant && selectedVariant.stock <= 0 
              ? 'text-red-500' 
              : 'text-yellow-500'
          }`}>
            {stockMessage()}
          </div>
        )}
        
        {selectedVariant && selectedVariant.barcode && (
          <div className="flex items-center text-xs text-gray-400 mb-2">
            <Barcode size={14} className="mr-1" />
            <span>{selectedVariant.barcode}</span>
          </div>
        )}
        
        <Button 
          onClick={handleAddToCart} 
          className={`w-full ${addedToCart ? 'bg-green-600' : 'app-button'} transition-colors`}
          disabled={isOutOfStock()}
        >
          {addedToCart ? (
            <>
              <Check size={18} className="mr-2" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart size={18} className="mr-2" />
              {isOutOfStock() ? 'Out of Stock' : 'Add to Cart'}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
