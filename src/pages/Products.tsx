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
    description: 'Premium whole wheat flour for chapatis and rotis',
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
    description: 'Hair color with salon-like finish, vibrant color and 100% gray coverage',
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
    description: 'Premium blend with Turkish Hazelnut, Colombian Gold, French Vanilla & English Butterscotch',
    price: 239,
    originalPrice: 399,
    discountPercentage: 40,
    imageUrl: '',
    category: 'Beverages',
    unit: 'g',
    quantity: '60',
    merchantId: 'm3'
  },
  {
    id: '4',
    name: 'Bisleri Mineral Water',
    description: 'Pure and safe drinking water, processed through multiple stages of purification',
    price: 20,
    originalPrice: 22,
    discountPercentage: 9,
    imageUrl: '',
    category: 'Beverages',
    unit: 'L',
    quantity: '1',
    merchantId: 'm1'
  },
  {
    id: '5',
    name: 'ButterBite Butter Cookie',
    description: 'Crispy butter cookies made with real butter and premium ingredients',
    price: 85,
    originalPrice: 100,
    discountPercentage: 15,
    imageUrl: '',
    category: 'Snacks',
    unit: 'g',
    quantity: '250',
    merchantId: 'm2'
  },
  {
    id: '6',
    name: '1968 by Tata Tea Masala Chai',
    description: 'Premium blend of Assam tea with authentic Indian spices for a rich flavor',
    price: 350,
    originalPrice: 390,
    discountPercentage: 10,
    imageUrl: '',
    category: 'Beverages',
    unit: 'g',
    quantity: '100',
    merchantId: 'm3'
  },
  {
    id: '7',
    name: 'Fresh Organic Bananas',
    description: 'Farm-fresh, pesticide-free organic bananas',
    price: 80,
    originalPrice: 90,
    discountPercentage: 11,
    imageUrl: '',
    category: 'Fruits & Vegetables',
    unit: 'dozen',
    quantity: '1',
    merchantId: 'm1'
  },
  {
    id: '8',
    name: 'Amul Butter',
    description: 'Smooth and creamy butter made from fresh cream',
    price: 55,
    originalPrice: 60,
    discountPercentage: 8,
    imageUrl: '',
    category: 'Dairy',
    unit: 'g',
    quantity: '100',
    merchantId: 'm2'
  },
  {
    id: '9',
    name: 'Organic Red Apples',
    description: 'Sweet and juicy apples from Himalayan orchards',
    price: 180,
    originalPrice: 220,
    discountPercentage: 18,
    imageUrl: '',
    category: 'Fruits & Vegetables',
    unit: 'kg',
    quantity: '1',
    merchantId: 'm3'
  },
  {
    id: '10',
    name: 'Basmati Rice Premium',
    description: 'Long-grain aromatic rice, perfect for biryanis and pulaos',
    price: 280,
    originalPrice: 320,
    discountPercentage: 12,
    imageUrl: '',
    category: 'Grocery',
    unit: 'kg',
    quantity: '5',
    merchantId: 'm1'
  },
  {
    id: '11',
    name: 'Dove Body Wash',
    description: 'Moisturizing body wash with 1/4 moisturizing cream',
    price: 220,
    originalPrice: 260,
    discountPercentage: 15,
    imageUrl: '',
    category: 'Personal Care',
    unit: 'ml',
    quantity: '250',
    merchantId: 'm2'
  },
  {
    id: '12',
    name: 'Farm Fresh Eggs',
    description: 'Free-range eggs from country chickens',
    price: 90,
    originalPrice: 100,
    discountPercentage: 10,
    imageUrl: '',
    category: 'Dairy',
    unit: 'units',
    quantity: '12',
    merchantId: 'm3'
  },
  {
    id: '13',
    name: 'Organic Honey',
    description: 'Raw, unprocessed honey from mountain beehives',
    price: 450,
    originalPrice: 550,
    discountPercentage: 18,
    imageUrl: '',
    category: 'Grocery',
    unit: 'g',
    quantity: '500',
    merchantId: 'm1'
  },
  {
    id: '14',
    name: 'Lay\'s Classic Potato Chips',
    description: 'Crunchy potato chips with the perfect amount of salt',
    price: 30,
    originalPrice: 35,
    discountPercentage: 14,
    imageUrl: '',
    category: 'Snacks',
    unit: 'g',
    quantity: '60',
    merchantId: 'm2'
  },
  {
    id: '15',
    name: 'Fresh Carrots',
    description: 'Organically grown carrots, rich in vitamins and antioxidants',
    price: 60,
    originalPrice: 70,
    discountPercentage: 14,
    imageUrl: '',
    category: 'Fruits & Vegetables',
    unit: 'kg',
    quantity: '1',
    merchantId: 'm3'
  },
  {
    id: '16',
    name: 'Kellogg\'s Corn Flakes',
    description: 'Crunchy breakfast cereal fortified with essential vitamins and minerals',
    price: 180,
    originalPrice: 210,
    discountPercentage: 14,
    imageUrl: '',
    category: 'Grocery',
    unit: 'g',
    quantity: '500',
    merchantId: 'm1'
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
