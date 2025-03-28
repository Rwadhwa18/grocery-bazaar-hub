
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, ShoppingBag, Search } from 'lucide-react';
import { Order, OrderStatus } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'ORD123456',
    customerId: 'cust1',
    items: [
      { productId: 'p1', productName: 'Ashirvaad Aata', quantity: 2, price: 200 },
      { productId: 'p2', productName: 'Tata Salt', quantity: 1, price: 20 }
    ],
    total: 420,
    status: 'delivered',
    createdAt: '2023-08-15T08:30:00Z',
    updatedAt: '2023-08-18T14:20:00Z',
    estimatedDelivery: '2023-08-18T00:00:00Z',
    trackingNumber: 'TRK78945612',
    paymentMethod: 'creditcard',
    shippingAddress: {
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001'
    }
  },
  {
    id: 'ORD123457',
    customerId: 'cust1',
    items: [
      { productId: 'p3', productName: 'Soap', quantity: 5, price: 25 },
      { productId: 'p4', productName: 'Shampoo', quantity: 1, price: 150 }
    ],
    total: 275,
    status: 'shipped',
    createdAt: '2023-09-20T10:15:00Z',
    updatedAt: '2023-09-21T08:40:00Z',
    estimatedDelivery: '2023-09-25T00:00:00Z',
    trackingNumber: 'TRK78945613',
    paymentMethod: 'upi',
    shippingAddress: {
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001'
    }
  },
  {
    id: 'ORD123458',
    customerId: 'cust1',
    items: [
      { productId: 'p5', productName: 'Rice', quantity: 1, price: 350 }
    ],
    total: 350,
    status: 'processing',
    createdAt: '2023-10-05T14:30:00Z',
    updatedAt: '2023-10-05T15:20:00Z',
    estimatedDelivery: '2023-10-10T00:00:00Z',
    paymentMethod: 'cod',
    shippingAddress: {
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001'
    }
  },
  {
    id: 'ORD123459',
    customerId: 'cust1',
    items: [
      { productId: 'p6', productName: 'Coffee', quantity: 2, price: 180 },
      { productId: 'p7', productName: 'Tea', quantity: 1, price: 120 }
    ],
    total: 480,
    status: 'pending',
    createdAt: '2023-10-10T09:15:00Z',
    updatedAt: '2023-10-10T09:15:00Z',
    paymentMethod: 'cod',
    shippingAddress: {
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001'
    }
  },
  {
    id: 'ORD123460',
    customerId: 'cust1',
    items: [
      { productId: 'p8', productName: 'Biscuits', quantity: 3, price: 30 }
    ],
    total: 90,
    status: 'cancelled',
    createdAt: '2023-09-05T16:45:00Z',
    updatedAt: '2023-09-06T10:30:00Z',
    paymentMethod: 'upi',
    shippingAddress: {
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001'
    }
  }
];

const statusLabels: Record<OrderStatus, string> = {
  'pending': 'Pending',
  'processing': 'Processing',
  'shipped': 'Shipped',
  'delivered': 'Delivered',
  'cancelled': 'Cancelled'
};

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  'pending': <Clock size={16} className="text-yellow-500" />,
  'processing': <Clock size={16} className="text-blue-500" />,
  'shipped': <Package size={16} className="text-purple-500" />,
  'delivered': <CheckCircle size={16} className="text-green-500" />,
  'cancelled': <XCircle size={16} className="text-red-500" />
};

const getStatusColor = (status: OrderStatus): string => {
  const colors: Record<OrderStatus, string> = {
    'pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'processing': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'shipped': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'delivered': 'bg-green-500/10 text-green-500 border-green-500/20',
    'cancelled': 'bg-red-500/10 text-red-500 border-red-500/20'
  };
  return colors[status];
};

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Simulate fetching orders from an API
    const fetchOrders = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrders(mockOrders);
      setIsLoading(false);
    };
    
    fetchOrders();
  }, []);
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

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
          
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-400">Track and manage your orders</p>
        </div>
        
        <div className="app-card p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search orders..."
                className="pl-10 app-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              className="border-appgold text-appgold hover:bg-appgold/10 sm:self-end"
              onClick={() => navigate('/shop')}
            >
              <ShoppingBag size={18} className="mr-2" />
              Browse Products
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {isLoading ? (
                <div className="py-12 text-center">
                  <p className="text-gray-400">Loading orders...</p>
                </div>
              ) : filteredOrders.length > 0 ? (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="app-card p-4 border border-appgray hover:border-appgold transition-colors cursor-pointer"
                      onClick={() => navigate(`/customer/order/${order.id}`)}
                    >
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold mr-3">{order.id}</h3>
                            <span className={`px-2 py-0.5 text-xs rounded-full border ${getStatusColor(order.status)}`}>
                              {statusIcons[order.status]}
                              <span className="ml-1">{statusLabels[order.status]}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">
                            Ordered on {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center">
                          <span className="font-semibold">₹{order.total}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-appgold ml-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/customer/order/${order.id}`);
                            }}
                          >
                            Track Order
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.productName} × {item.quantity}</span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <h3 className="text-xl font-semibold mb-2">No orders found</h3>
                  <p className="text-gray-400 mb-6">
                    {searchTerm 
                      ? "No orders match your search criteria" 
                      : activeTab === 'all' 
                        ? "You haven't placed any orders yet" 
                        : `You don't have any ${activeTab} orders`}
                  </p>
                  <Button 
                    className="app-button"
                    onClick={() => navigate('/shop')}
                  >
                    Start Shopping
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
