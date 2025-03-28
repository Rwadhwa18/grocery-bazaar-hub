
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Trash2, Plus, Minus, ArrowLeft, ShoppingBag, 
  CreditCard, Truck, AlertTriangle 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const { toast } = useToast();
  
  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some products to your cart before checkout",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would navigate to checkout page or process
    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been placed and is being processed",
    });
    
    // Generate a mock order ID
    const orderId = 'ORD' + Math.floor(Math.random() * 1000000);
    
    // Clear the cart after successful order
    clearCart();
    
    // Navigate to order tracking page
    navigate(`/customer/order/${orderId}`);
  };
  
  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast({
        title: "No coupon code entered",
        description: "Please enter a valid coupon code",
        variant: "destructive"
      });
      return;
    }
    
    // Mock coupon validation
    if (couponCode.toUpperCase() === 'WELCOME10') {
      toast({
        title: "Coupon applied!",
        description: "10% discount applied to your order",
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-appbg">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-4 hover:bg-transparent hover:text-appgold"
            onClick={() => navigate('/customer/dashboard')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
          <p className="text-gray-400">Review your items and proceed to checkout</p>
        </div>
        
        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="app-card p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Cart Items ({items.length})</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 border-red-500/30 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500"
                    onClick={clearCart}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Clear Cart
                  </Button>
                </div>
                
                <div className="divide-y divide-appgray">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-4 flex items-center">
                      <div className="w-20 h-20 bg-appgray rounded-lg overflow-hidden mr-4 flex-shrink-0">
                        {item.product.imageUrl ? (
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-appgray">
                            <ShoppingBag size={24} className="text-gray-500" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">
                          {item.product.quantity} {item.product.unit}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 rounded-md"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 rounded-md"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-semibold">₹{item.product.price * item.quantity}</div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 h-8 px-2 hover:bg-red-500/10 hover:text-red-500"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <Trash2 size={14} className="mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full border-appgold text-appgold hover:bg-appgold/10"
                onClick={() => navigate('/shop')}
              >
                <ShoppingBag size={18} className="mr-2" />
                Continue Shopping
              </Button>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="app-card p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping Fee</span>
                    <span>₹40</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax</span>
                    <span>₹{Math.round(total * 0.05)}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-appgray">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{total + 40 + Math.round(total * 0.05)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mb-6">
                  <Input
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="app-input"
                  />
                  <Button 
                    variant="outline" 
                    className="border-appgold text-appgold"
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </Button>
                </div>
                
                <Button 
                  className="w-full app-button mb-4"
                  onClick={handleCheckout}
                >
                  <CreditCard size={18} className="mr-2" />
                  Proceed to Checkout
                </Button>
                
                <div className="flex items-start space-x-2 text-sm text-gray-400">
                  <Truck size={16} className="mt-0.5 flex-shrink-0" />
                  <p>Free shipping on orders above ₹500. Delivery within 2-3 business days.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="app-card py-16 px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-appgray/50">
                <ShoppingBag size={48} className="text-gray-400" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Start shopping to add products.
            </p>
            <Button 
              className="app-button"
              onClick={() => navigate('/shop')}
            >
              Browse Products
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
