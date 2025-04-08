
import * as React from 'react';
import { Product, CartItem, ProductVariant } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const { toast } = useToast();
  
  // Load cart from localStorage on initial render
  React.useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  const addToCart = (product: Product, quantity: number, variant?: ProductVariant) => {
    setItems(prevItems => {
      const cartItemId = variant 
        ? `${product.id}-${variant.id}`
        : product.id;
        
      const existingItemIndex = prevItems.findIndex(item => {
        if (variant && item.variant) {
          return item.product.id === product.id && item.variant.id === variant.id;
        }
        return item.product.id === product.id && !item.variant;
      });
      
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        return prevItems.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, { product, variant, quantity }];
      }
    });
    
    const variantText = variant ? `(${variant.weightValue}${variant.weightUnit})` : '';
    
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} ${variantText} added to your cart`,
    });
  };
  
  const removeFromCart = (productId: string, variantId?: string) => {
    setItems(prevItems => prevItems.filter(item => {
      if (variantId && item.variant) {
        return !(item.product.id === productId && item.variant.id === variantId);
      }
      return item.product.id !== productId;
    }));
    
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
    });
  };
  
  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => {
        const isMatch = variantId && item.variant
          ? item.product.id === productId && item.variant.id === variantId
          : item.product.id === productId && !item.variant;
          
        return isMatch ? { ...item, quantity } : item;
      })
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  const total = items.reduce(
    (sum, item) => {
      const price = item.variant ? item.variant.price : item.product.price;
      return sum + (price * item.quantity);
    }, 
    0
  );
  
  const itemCount = items.reduce(
    (count, item) => count + item.quantity, 
    0
  );
  
  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        total,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
