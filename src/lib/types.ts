
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
