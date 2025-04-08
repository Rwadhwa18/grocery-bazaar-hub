
import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import ProductList from '@/components/products/ProductList';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, SlidersHorizontal, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { standardizeProducts } from '@/lib/mockData';

// Import from the Index page (in a real app would be from a shared data source)
const rawMockProducts = [
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
  },
  {
    id: '7',
    name: 'Organic Bananas',
    description: 'Fresh organic bananas',
    price: 40,
    originalPrice: 45,
    discountPercentage: 11,
    imageUrl: 'https://source.unsplash.com/random/200x200/?banana',
    category: 'Fruits',
    unit: 'dozen',
    quantity: '1',
    merchantId: 'm1'
  },
  {
    id: '8',
    name: 'Farm Fresh Eggs',
    description: 'Free-range chicken eggs',
    price: 80,
    originalPrice: 90,
    discountPercentage: 11,
    imageUrl: 'https://source.unsplash.com/random/200x200/?eggs',
    category: 'Dairy & Eggs',
    unit: 'dozen',
    quantity: '1',
    merchantId: 'm2'
  },
  {
    id: '9',
    name: 'Amul Butter',
    description: 'Pure butter for your breakfast',
    price: 50,
    imageUrl: 'https://source.unsplash.com/random/200x200/?butter',
    category: 'Dairy & Eggs',
    unit: 'g',
    quantity: '100',
    merchantId: 'm3'
  },
  {
    id: '10',
    name: 'Fresh Tomatoes',
    description: 'Ripe red tomatoes',
    price: 30,
    originalPrice: 40,
    discountPercentage: 25,
    imageUrl: 'https://source.unsplash.com/random/200x200/?tomatoes',
    category: 'Vegetables',
    unit: 'kg',
    quantity: '1',
    merchantId: 'm1'
  },
  {
    id: '11',
    name: 'Whole Grain Bread',
    description: 'Freshly baked whole grain bread',
    price: 40,
    imageUrl: 'https://source.unsplash.com/random/200x200/?bread',
    category: 'Bakery',
    unit: 'loaf',
    quantity: '1',
    merchantId: 'm2'
  },
  {
    id: '12',
    name: 'Chicken Breast',
    description: 'Boneless chicken breast',
    price: 200,
    originalPrice: 230,
    discountPercentage: 13,
    imageUrl: 'https://source.unsplash.com/random/200x200/?chicken',
    category: 'Meat & Seafood',
    unit: 'kg',
    quantity: '1',
    merchantId: 'm3'
  }
];

const categories = [
  'All Categories',
  'Fruits',
  'Vegetables',
  'Dairy & Eggs',
  'Bakery',
  'Meat & Seafood',
  'Beverages',
  'Snacks',
  'Personal Care',
  'Household',
  'Grocery',
];

const Shop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showFilters, setShowFilters] = useState(false);
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const standardizedProducts = standardizeProducts(rawMockProducts);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setFilteredProducts(standardizedProducts);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter products based on filters
    let filtered = [...standardizedProducts];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by discount
    if (discountedOnly) {
      filtered = filtered.filter(product => product.discountPercentage !== undefined);
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, discountedOnly]);

  const applyFilters = () => {
    setShowFilters(false);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 400]);
    setSelectedCategory('All Categories');
    setDiscountedOnly(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-appbg">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shop</h1>
          <p className="text-gray-400">Browse all products from our catalog</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="app-card p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>
                <Button 
                  variant="ghost" 
                  className="text-appgold flex items-center text-sm p-0 h-auto hover:bg-transparent hover:text-appgold/80"
                  onClick={resetFilters}
                >
                  <FilterX size={16} className="mr-1" /> Reset all filters
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <button
                          className={`text-sm py-1 w-full text-left ${selectedCategory === category ? 'text-appgold' : 'text-gray-300'}`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 400]}
                      max={400}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Other Filters</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="discounted" 
                        checked={discountedOnly}
                        onCheckedChange={(checked) => setDiscountedOnly(checked as boolean)}
                      />
                      <Label htmlFor="discounted">Discounted items only</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filter Bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 app-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="md:hidden border-appgray text-gray-300"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} className="mr-2" />
                Filters
              </Button>
            </div>
            
            {/* Mobile Filters */}
            {showFilters && (
              <div className="app-card p-6 mb-6 md:hidden">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Categories</h4>
                    <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory}>
                      <TabsList className="w-full flex-wrap h-auto">
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
                  
                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 400]}
                        max={400}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Other Filters</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="discounted-mobile" 
                          checked={discountedOnly}
                          onCheckedChange={(checked) => setDiscountedOnly(checked as boolean)}
                        />
                        <Label htmlFor="discounted-mobile">Discounted items only</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-appgray">
                    <Button 
                      variant="ghost" 
                      onClick={resetFilters}
                    >
                      Reset
                    </Button>
                    <Button 
                      className="app-button"
                      onClick={applyFilters}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-400">
                {isLoading ? 'Loading products...' : `${filteredProducts.length} products found`}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className={`text-sm ${discountedOnly ? 'text-appgold' : 'text-gray-400'}`}
                  onClick={() => setDiscountedOnly(!discountedOnly)}
                >
                  {discountedOnly ? 'All Products' : 'Show Discounts'}
                </Button>
              </div>
            </div>
            
            {/* Product List */}
            <ProductList products={filteredProducts} isLoading={isLoading} />
            
            {/* Empty State */}
            {!isLoading && filteredProducts.length === 0 && (
              <div className="py-16 text-center">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={resetFilters} variant="outline" className="border-appgold text-appgold">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
