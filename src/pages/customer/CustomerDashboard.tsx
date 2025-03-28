
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, Clock, Home, User, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CategoryList from '@/components/customer/CategoryList';
import FeaturedProducts from '@/components/customer/FeaturedProducts';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  
  // Mock user data (in a real app, would be fetched from backend)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    pendingOrders: 2,
    totalOrders: 12
  };

  return (
    <div className="min-h-screen flex flex-col bg-appbg">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-gray-400">Manage your orders and discover new products</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="outline" 
              className="border-appgold text-appgold"
              onClick={() => navigate('/customer/orders')}
            >
              <Package size={18} className="mr-2" />
              My Orders
            </Button>
            <Button 
              className="app-button relative"
              onClick={() => navigate('/customer/cart')}
            >
              <ShoppingCart size={18} className="mr-2" />
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
        
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="app-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5 text-appgold" />
                Cart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{itemCount}</p>
              <p className="text-gray-400 text-sm">Items in your cart</p>
              <Button 
                className="mt-4 w-full app-button"
                onClick={() => navigate('/customer/cart')}
              >
                View Cart
              </Button>
            </CardContent>
          </Card>
          
          <Card className="app-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5 text-appgold" />
                Pending Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{user.pendingOrders}</p>
              <p className="text-gray-400 text-sm">Orders to be delivered</p>
              <Button 
                className="mt-4 w-full app-button"
                onClick={() => navigate('/customer/orders')}
              >
                Track Orders
              </Button>
            </CardContent>
          </Card>
          
          <Card className="app-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Package className="mr-2 h-5 w-5 text-appgold" />
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{user.totalOrders}</p>
              <p className="text-gray-400 text-sm">Orders placed till date</p>
              <Button 
                className="mt-4 w-full app-button"
                onClick={() => navigate('/customer/orders')}
              >
                Order History
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Product Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <CategoryList />
        </div>
        
        {/* Featured Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <FeaturedProducts />
        </div>
        
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button 
            variant="outline" 
            className="border-appgray h-auto py-6 flex flex-col items-center gap-2 hover:border-appgold"
            onClick={() => navigate('/shop')}
          >
            <ShoppingBag size={24} />
            <span>Browse All Products</span>
          </Button>
          <Button 
            variant="outline" 
            className="border-appgray h-auto py-6 flex flex-col items-center gap-2 hover:border-appgold"
            onClick={() => navigate('/customer/orders')}
          >
            <Package size={24} />
            <span>My Orders</span>
          </Button>
          <Button 
            variant="outline" 
            className="border-appgray h-auto py-6 flex flex-col items-center gap-2 hover:border-appgold"
            onClick={() => {}}
          >
            <User size={24} />
            <span>My Profile</span>
          </Button>
          <Button 
            variant="outline" 
            className="border-appgray h-auto py-6 flex flex-col items-center gap-2 hover:border-appgold"
            onClick={() => {}}
          >
            <Home size={24} />
            <span>Delivery Addresses</span>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
