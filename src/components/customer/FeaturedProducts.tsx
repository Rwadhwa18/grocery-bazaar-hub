
import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import ProductCard from '@/components/products/ProductCard';

const FeaturedProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Mock API call to get featured products
    const fetchFeaturedProducts = async () => {
      // In a real app, this would be an API call
      setIsLoading(true);
      
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock featured products
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Ashirvaad Aata',
          description: 'Whole wheat flour',
          price: 200,
          originalPrice: 270,
          discountPercentage: 25,
          imageUrl: '',
          category: 'Grocery',
          unit: 'kg',
          quantity: '5',
          merchantId: 'm1',
          variants: [
            {
              id: 'v1',
              barcode: 'AATA5KG',
              rating: 4.5,
              weightValue: 5,
              weightUnit: 'kg',
              price: 200,
              mrp: 270,
              stock: 50
            },
            {
              id: 'v2',
              barcode: 'AATA10KG',
              rating: 4.5,
              weightValue: 10,
              weightUnit: 'kg',
              price: 390,
              mrp: 450,
              stock: 30
            }
          ]
        },
        {
          id: '2',
          name: 'BBLUNT Salon Hair Colour',
          description: 'Hair color with salon-like finish',
          price: 300,
          originalPrice: 350,
          discountPercentage: 14,
          imageUrl: '',
          category: 'Personal Care',
          unit: 'ml',
          quantity: '100',
          merchantId: 'm2',
          variants: [
            {
              id: 'v3',
              barcode: 'BBLUNT100',
              rating: 4.2,
              weightValue: 100,
              weightUnit: 'ml',
              price: 300,
              mrp: 350,
              stock: 25
            }
          ]
        },
        {
          id: '3',
          name: 'Bevzilla Instant Coffee',
          description: 'Turkish Hazelnut, Colombian Gold, French Vanilla & English Butterscotch',
          price: 239,
          originalPrice: 399,
          discountPercentage: 40,
          imageUrl: '',
          category: 'Beverages',
          unit: 'N',
          quantity: '60',
          merchantId: 'm3',
          variants: [
            {
              id: 'v4',
              barcode: 'BEV60G',
              rating: 4.8,
              weightValue: 60,
              weightUnit: 'g',
              price: 239,
              mrp: 399,
              stock: 15
            }
          ]
        },
        {
          id: '4',
          name: 'Bisleri Water',
          description: 'ARL Water International',
          price: 20,
          originalPrice: 22,
          discountPercentage: 9,
          imageUrl: '',
          category: 'Beverages',
          unit: '*',
          quantity: '12',
          merchantId: 'm1',
          variants: [
            {
              id: 'v5',
              barcode: 'BIS1L',
              rating: 4.0,
              weightValue: 1,
              weightUnit: 'L',
              price: 20,
              mrp: 22,
              stock: 100
            },
            {
              id: 'v6',
              barcode: 'BIS500ML',
              rating: 4.0,
              weightValue: 500,
              weightUnit: 'ml',
              price: 10,
              mrp: 12,
              stock: 150
            }
          ]
        }
      ];
      
      setProducts(mockProducts);
      setIsLoading(false);
    };
    
    fetchFeaturedProducts();
  }, []);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      {isLoading && Array(4).fill(0).map((_, index) => (
        <div key={index} className="app-card animate-pulse h-96" />
      ))}
    </div>
  );
};

export default FeaturedProducts;
