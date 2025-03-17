
import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductListProps {
  title?: string;
  products: Product[];
  isLoading?: boolean;
}

const ProductList = ({ title, products, isLoading = false }: ProductListProps) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Simulating a staggered loading effect for smooth animations
    if (!isLoading) {
      const loadProducts = async () => {
        setCurrentProducts([]);
        for (let i = 0; i < products.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setCurrentProducts(prev => [...prev, products[i]]);
        }
      };
      
      loadProducts();
    }
  }, [products, isLoading]);

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array(8).fill(0).map((_, index) => (
              <div key={index} className="app-card animate-pulse">
                <Skeleton className="h-44 w-full rounded-t-lg" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between mb-4">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))
          : currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </div>
  );
};

export default ProductList;
