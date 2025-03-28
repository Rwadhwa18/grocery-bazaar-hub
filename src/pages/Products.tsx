
import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import ProductList from '@/components/products/ProductList';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

// Mock products data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ashirvaad Aata',
    description: 'Whole wheat flour',
    price: 200,
    originalPrice: 270,
    discountPercentage: 25,
    imageUrl: 'https://source.unsplash.com/random/200x200/?flour',
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
    imageUrl: 'https://source.unsplash.com/random/200x200/?haircolor',
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
    imageUrl: 'https://source.unsplash.com/random/200x200/?coffee',
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
    imageUrl: 'https://source.unsplash.com/random/200x200/?water',
    category: 'Beverages',
    unit: '*',
    quantity: '12',
    merchantId: 'm1'
  },
  {
    id: '5',
    name: 'ButterBite Butter Cookie',
    description: 'Crispy butter cookies',
    price: 85,
    originalPrice: 100,
    discountPercentage: 15,
    imageUrl: 'https://source.unsplash.com/random/200x200/?cookies',
    category: 'Snacks',
    unit: 'g',
    quantity: '250',
    merchantId: 'm2'
  },
  {
    id: '6',
    name: '1968 by Tata Tea Masala Chai',
    description: 'Variety of Taste in Every Sip',
    price: 350,
    imageUrl: 'https://source.unsplash.com/random/200x200/?tea',
    category: 'Beverages',
    unit: 'g',
    quantity: '100',
    merchantId: 'm3'
  }
];

// Product categories for filtering
const categories = [
  'All Categories',
  'Grocery',
  'Personal Care',
  'Beverages',
  'Snacks',
  'Dairy',
  'Fruits & Vegetables'
];

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All Categories');
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = currentCategory === 'All Categories' || product.category === currentCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-appbg">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Our Products</h1>
          <p className="text-gray-400">Browse our selection of quality products</p>
        </div>
        
        {/* Search and Categories */}
        <div className="mb-8 space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 app-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="All Categories" onValueChange={setCurrentCategory}>
            <TabsList className="mb-4 flex flex-wrap h-auto">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="my-1"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* Products Display */}
        {isLoading ? (
          <div className="py-12 text-center">
            <p className="text-gray-400">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} isLoading={false} />
        ) : (
          <div className="py-12 text-center">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or category selection</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setCurrentCategory('All Categories');
              }} 
              variant="outline" 
              className="border-appgold text-appgold"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
