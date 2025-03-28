
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
          merchantId: 'm1'
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
          merchantId: 'm2'
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
          merchantId: 'm3'
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
          merchantId: 'm1'
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
