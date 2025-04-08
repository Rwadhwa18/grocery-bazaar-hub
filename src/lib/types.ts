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

export interface ProductVariant {
  id: string;
  barcode: string;
  rating: number;
  weightValue: number;
  weightUnit: string; // g, kg, ml, L, pcs
  price: number;
  mrp: number; // Maximum Retail Price (equivalent to originalPrice)
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  brand?: string;
  isVeg?: boolean;
  categories?: string[];
  imageUrls?: string[];
  imageUrl: string; // Keeping for backward compatibility
  category: string;
  merchantId: string;
  variants: ProductVariant[];
  
  // Legacy fields (keeping for backward compatibility)
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  unit: string;
  quantity: string | number;
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
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
  variantId?: string;
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
