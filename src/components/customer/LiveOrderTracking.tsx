
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Order, OrderStatus } from '@/lib/types';
import { MapPin, Truck, Clock, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LiveOrderTrackingProps {
  order: Order;
}

const LiveOrderTracking = ({ order }: LiveOrderTrackingProps) => {
  const [estimatedTime, setEstimatedTime] = useState<number>(30); // minutes
  const [deliveryStatus, setDeliveryStatus] = useState<OrderStatus>(order.status);
  const [courierLocation, setCourierLocation] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();

  // Simulate real-time updates
  useEffect(() => {
    if (order.status === 'shipped') {
      // Simulate courier location updates
      const locationInterval = setInterval(() => {
        // This would be replaced with real location data from a backend
        setCourierLocation({
          lat: 19.0760 + (Math.random() * 0.01 - 0.005),
          lng: 72.8777 + (Math.random() * 0.01 - 0.005)
        });
        
        // Decrease estimated time randomly
        setEstimatedTime(prev => {
          const newTime = prev - Math.floor(Math.random() * 2);
          return newTime > 5 ? newTime : 5;
        });
      }, 10000);
      
      // Simulate status updates
      const statusInterval = setTimeout(() => {
        if (deliveryStatus === 'shipped') {
          setDeliveryStatus('delivered');
          toast({
            title: "Order Delivered!",
            description: `Your order ${order.id} has been delivered`
          });
        }
      }, 60000);
      
      return () => {
        clearInterval(locationInterval);
        clearTimeout(statusInterval);
      };
    }
  }, [order.id, order.status, deliveryStatus, toast]);

  // Get status icon
  const getStatusIcon = () => {
    switch (deliveryStatus) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500 animate-pulse" />;
      case 'delivered':
        return <MapPin className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  if (order.status === 'cancelled') {
    return null;
  }

  if (order.status === 'delivered') {
    return (
      <div className="app-card p-4 mb-4 border-green-500/20">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-green-500 font-medium">This order has been delivered</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app-card p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        Live Tracking
        <Badge variant="outline" className="ml-2 bg-purple-500/10 text-purple-500 border-purple-500/20">
          LIVE
        </Badge>
      </h3>
      
      <div className="flex items-center mb-4">
        {getStatusIcon()}
        <div className="ml-3">
          <p className="font-medium">
            {deliveryStatus === 'shipped' ? 'Order on the way' : 
             deliveryStatus === 'delivered' ? 'Order delivered' : 
             'Order being prepared'}
          </p>
          {deliveryStatus === 'shipped' && (
            <p className="text-sm text-gray-400">
              Estimated delivery in {estimatedTime} minutes
            </p>
          )}
        </div>
      </div>
      
      {courierLocation && (
        <div className="bg-appgray/20 p-3 rounded-md">
          <div className="flex items-center mb-2">
            <Truck className="h-4 w-4 mr-2 text-purple-500" />
            <span className="text-sm font-medium">Delivery partner location</span>
          </div>
          <div className="text-xs text-gray-400 grid grid-cols-2">
            <span>Latitude:</span>
            <span>{courierLocation.lat.toFixed(6)}</span>
            <span>Longitude:</span>
            <span>{courierLocation.lng.toFixed(6)}</span>
          </div>
          <p className="text-xs text-gray-400 mt-2 italic">
            Note: This is simulated data. In a real app, this would show the actual courier location.
          </p>
        </div>
      )}
    </div>
  );
};

export default LiveOrderTracking;
