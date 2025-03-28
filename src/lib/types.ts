
export type UserRole = 'customer' | 'merchant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location?: Location;
  avatar?: string;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  imageUrl: string;
  category: string;
  unit: string;
  quantity: string | number;
  merchantId: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  paymentMethod?: string;
  shippingAddress: Location;
}

export interface OrderTrackingEvent {
  id: string;
  orderId: string;
  status: OrderStatus;
  location?: string;
  timestamp: string;
  description: string;
}
