import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, CheckCircle, Clock, Truck, Home, AlertTriangle, Share2, MapPin } from 'lucide-react';
import { Order, OrderTrackingEvent, OrderStatus } from '@/lib/types';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import LocationSharing from '@/components/customer/LocationSharing';
import LiveOrderTracking from '@/components/customer/LiveOrderTracking';

const mockOrder: Order = {
  id: 'ORD123456',
  customerId: 'cust1',
  items: [
    { productId: 'p1', productName: 'Ashirvaad Aata', quantity: 2, price: 200 },
    { productId: 'p2', productName: 'Tata Salt', quantity: 1, price: 20 }
  ],
  total: 420,
  status: 'shipped',
  createdAt: '2023-10-15T08:30:00Z',
  updatedAt: '2023-10-18T14:20:00Z',
  estimatedDelivery: '2023-10-22T00:00:00Z',
  trackingNumber: 'TRK78945612',
  paymentMethod: 'creditcard',
  shippingAddress: {
    address: '123 Main St',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001'
  }
};

const mockTrackingEvents: OrderTrackingEvent[] = [
  {
    id: 'evt1',
    orderId: 'ORD123456',
    status: 'pending',
    location: 'Online',
    timestamp: '2023-10-15T08:30:00Z',
    description: 'Order placed successfully'
  },
  {
    id: 'evt2',
    orderId: 'ORD123456',
    status: 'processing',
    location: 'Seller Facility, Delhi',
    timestamp: '2023-10-16T10:15:00Z',
    description: 'Order confirmed and processed'
  },
  {
    id: 'evt3',
    orderId: 'ORD123456',
    status: 'shipped',
    location: 'Shipping Partner Facility, Delhi',
    timestamp: '2023-10-18T14:20:00Z',
    description: 'Order shipped with shipping partner'
  }
];

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  'pending': <Clock size={24} />,
  'processing': <Package size={24} />,
  'shipped': <Truck size={24} />,
  'delivered': <Home size={24} />,
  'cancelled': <AlertTriangle size={24} />
};

const statusLabels: Record<OrderStatus, string> = {
  'pending': 'Order Placed',
  'processing': 'Processing',
  'shipped': 'Shipped',
  'delivered': 'Delivered',
  'cancelled': 'Cancelled'
};

const OrderTracking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [trackingEvents, setTrackingEvents] = useState<OrderTrackingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLocationSharing, setShowLocationSharing] = useState(false);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (id) {
        setOrder({...mockOrder, id});
        setTrackingEvents(mockTrackingEvents.map(event => ({...event, orderId: id})));
      }
      
      setIsLoading(false);
    };
    
    fetchOrderDetails();
  }, [id]);
  
  const getDeliveryStatusPercentage = (): number => {
    if (!order) return 0;
    
    const statusMap: Record<OrderStatus, number> = {
      'pending': 25,
      'processing': 50,
      'shipped': 75,
      'delivered': 100,
      'cancelled': 0
    };
    
    return statusMap[order.status];
  };
  
  const handleCancelOrder = () => {
    toast({
      title: "Order Cancelled",
      description: `Order ${id} has been cancelled successfully`,
    });
    
    if (order) {
      setOrder({...order, status: 'cancelled'});
      setTrackingEvents([
        ...trackingEvents,
        {
          id: 'evt-cancel',
          orderId: order.id,
          status: 'cancelled',
          location: 'Online',
          timestamp: new Date().toISOString(),
          description: 'Order cancelled by customer'
        }
      ]);
    }
  };

  const handleLocationShare = (coords: GeolocationCoordinates) => {
    console.log('Location shared:', coords);
    toast({
      title: "Location shared with delivery partner",
      description: "Your current location has been shared to help with delivery"
    });
  };
  
  const handleShareOrder = () => {
    if (navigator.share && order) {
      navigator.share({
        title: `Order #${order.id}`,
        text: `Track my order #${order.id} from Grocery Bazaar Hub`,
        url: window.location.href
      })
      .then(() => console.log('Order shared successfully'))
      .catch((error) => console.log('Error sharing order:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "Share this link with others to let them track your order"
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
            onClick={() => navigate('/customer/orders')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Orders
          </Button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Order Tracking</h1>
              <p className="text-gray-400">
                {isLoading ? 'Loading order details...' : order ? `Track your order ${order.id}` : 'Order not found'}
              </p>
            </div>
            
            {order && !isLoading && (
              <Button
                variant="outline"
                className="border-appgold text-appgold"
                onClick={handleShareOrder}
              >
                <Share2 size={16} className="mr-2" />
                Share Order
              </Button>
            )}
          </div>
        </div>
        
        {isLoading ? (
          <div className="app-card p-8 text-center">
            <p className="text-gray-400">Loading order details...</p>
          </div>
        ) : order ? (
          <div className="space-y-8">
            {order.status === 'shipped' && (
              <LiveOrderTracking order={order} />
            )}
            
            {(order.status === 'shipped' || order.status === 'processing') && (
              <>
                {showLocationSharing ? (
                  <LocationSharing onLocationShare={handleLocationShare} />
                ) : (
                  <div className="app-card p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Share Your Location</h3>
                        <p className="text-sm text-gray-400">
                          Share your location to help delivery personnel find you easier
                        </p>
                      </div>
                      <Button
                        className="app-button"
                        onClick={() => setShowLocationSharing(true)}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="app-card p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Order {order.id}</h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Placed on {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
                
                {order.status !== 'cancelled' && order.status !== 'delivered' && (
                  <div>
                    <Button 
                      variant="outline" 
                      className="border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500"
                      onClick={handleCancelOrder}
                    >
                      <AlertTriangle size={16} className="mr-2" />
                      Cancel Order
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="mt-8 mb-4">
                <div className="relative">
                  <div className="h-2 bg-appgray rounded-full">
                    <div 
                      className="h-2 bg-appgold rounded-full transition-all duration-1000"
                      style={{ width: `${getDeliveryStatusPercentage()}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-4 gap-2">
                    {(['pending', 'processing', 'shipped', 'delivered'] as OrderStatus[]).map((status, index) => {
                      const isActive = ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status) >= index;
                      const isCurrent = order.status === status;
                      
                      return (
                        <div key={status} className="flex flex-col items-center text-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                            isActive 
                              ? isCurrent 
                                ? 'bg-appgold text-black' 
                                : 'bg-appgold/20 text-appgold' 
                              : 'bg-appgray text-gray-400'
                          }`}>
                            {statusIcons[status]}
                          </div>
                          <span className={`text-sm ${isActive ? 'text-appfg' : 'text-gray-400'}`}>
                            {statusLabels[status]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {order.estimatedDelivery && order.status !== 'cancelled' && order.status !== 'delivered' && (
                <div className="my-6 p-4 bg-appgray/30 rounded-lg">
                  <p className="text-center">
                    <span className="font-semibold">Estimated Delivery:</span>{' '}
                    {format(new Date(order.estimatedDelivery), 'EEEE, MMMM dd, yyyy')}
                  </p>
                </div>
              )}
              
              {order.status === 'cancelled' && (
                <div className="my-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-center text-red-500">
                    This order has been cancelled
                  </p>
                </div>
              )}
              
              {order.status === 'delivered' && (
                <div className="my-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle size={20} className="text-green-500 mr-2" />
                  <p className="text-center text-green-500">
                    This order has been delivered successfully
                  </p>
                </div>
              )}
              
              {order.trackingNumber && (
                <div className="mt-6 p-4 border border-appgray rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Tracking Number</p>
                      <p className="font-semibold">{order.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Payment Method</p>
                      <p className="font-semibold capitalize">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Amount</p>
                      <p className="font-semibold">₹{order.total}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="app-card p-6">
              <h2 className="text-xl font-semibold mb-6">Tracking Timeline</h2>
              
              <div className="space-y-8">
                {trackingEvents
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((event, index) => (
                    <div key={event.id} className="flex">
                      <div className="mr-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-appgold text-black' : 'bg-appgray text-gray-400'
                        }`}>
                          {statusIcons[event.status]}
                        </div>
                        {index !== trackingEvents.length - 1 && (
                          <div className="h-full w-0.5 bg-appgray mx-auto my-2"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between mb-1">
                          <h3 className="font-semibold">{event.description}</h3>
                          <span className="text-sm text-gray-400">
                            {format(new Date(event.timestamp), 'MMM dd, yyyy - h:mm a')}
                          </span>
                        </div>
                        {event.location && (
                          <p className="text-sm text-gray-400">{event.location}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="app-card p-6">
              <h2 className="text-xl font-semibold mb-6">Order Items</h2>
              
              <div className="divide-y divide-appgray">
                {order.items.map((item, index) => (
                  <div key={index} className="py-4 flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.productName}</h3>
                      <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{item.price * item.quantity}</p>
                      <p className="text-sm text-gray-400">₹{item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-appgray">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Subtotal</span>
                  <span>₹{order.total - 40 - Math.round(order.total * 0.05)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Shipping Fee</span>
                  <span>₹40</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">Tax</span>
                  <span>₹{Math.round(order.total * 0.05)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-appgray">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">₹{order.total}</span>
                </div>
              </div>
            </div>
            
            <div className="app-card p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              
              <div className="flex items-start">
                <Home size={20} className="mr-3 mt-1 text-gray-400" />
                <div>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                  <p>{order.shippingAddress.zipCode}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className="border-appgray"
                onClick={() => navigate('/customer/orders')}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Orders
              </Button>
              
              <Button 
                className="app-button"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div className="app-card p-8 text-center">
            <div className="mb-4 flex justify-center">
              <AlertTriangle size={48} className="text-red-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
            <p className="text-gray-400 mb-6">
              We couldn't find the order you're looking for. It might have been removed or the ID is incorrect.
            </p>
            <Button 
              className="app-button"
              onClick={() => navigate('/customer/orders')}
            >
              View All Orders
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderTracking;
