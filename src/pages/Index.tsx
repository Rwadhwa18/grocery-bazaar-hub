
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import ProductList from '@/components/products/ProductList';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/layout/Footer';
import { ArrowRight, ShoppingBag, Clock, Award, Truck, MapPin } from 'lucide-react';

// Mock products data
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
  }
];

const categories = [
  { id: 'c1', name: 'Fruits & Vegetables', icon: '🍎' },
  { id: 'c2', name: 'Dairy & Eggs', icon: '🥚' },
  { id: 'c3', name: 'Meat & Seafood', icon: '🍗' },
  { id: 'c4', name: 'Bakery', icon: '🍞' },
  { id: 'c5', name: 'Frozen Foods', icon: '❄️' },
  { id: 'c6', name: 'Snacks', icon: '🍫' },
  { id: 'c7', name: 'Beverages', icon: '🥤' },
  { id: 'c8', name: 'Personal Care', icon: '🧴' },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setFeaturedProducts(mockProducts.slice(0, 4));
      setBestSellingProducts(mockProducts.slice(4));
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-appbg">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-appgray relative overflow-hidden">
          <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 z-10 animate-fade-in">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Fresh Groceries <span className="text-appgold">Delivered</span> To Your Doorstep
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-md">
                Shop from a wide range of fresh groceries and household essentials with doorstep delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop">
                  <Button className="app-button px-8 py-6 text-lg">
                    Shop Now <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="border-appgold text-appgold hover:bg-appgold hover:text-appbg py-6 text-lg">
                    Become a Merchant
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 mt-8 md:mt-0 relative animate-fade-in">
              <div className="relative h-80 md:h-96 w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-appgold/20 to-appbg/5 rounded-lg"></div>
                <img 
                  src="https://source.unsplash.com/random/1000x800/?groceries" 
                  alt="Fresh groceries" 
                  className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-90"
                />
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-appbg to-transparent"></div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose <span className="text-appgold">Grocery Bazaar</span>?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="app-card p-6 text-center transition-transform hover:-translate-y-2 duration-300">
                <div className="h-14 w-14 rounded-full bg-appgold/20 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-7 w-7 text-appgold" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Quick Delivery</h3>
                <p className="text-gray-400">Get your groceries delivered in under 2 hours</p>
              </div>
              
              <div className="app-card p-6 text-center transition-transform hover:-translate-y-2 duration-300">
                <div className="h-14 w-14 rounded-full bg-appgold/20 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-7 w-7 text-appgold" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
                <p className="text-gray-400">Handpicked fresh and quality assured items</p>
              </div>
              
              <div className="app-card p-6 text-center transition-transform hover:-translate-y-2 duration-300">
                <div className="h-14 w-14 rounded-full bg-appgold/20 flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-7 w-7 text-appgold" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-400">Free delivery on orders above ₹499</p>
              </div>
              
              <div className="app-card p-6 text-center transition-transform hover:-translate-y-2 duration-300">
                <div className="h-14 w-14 rounded-full bg-appgold/20 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-7 w-7 text-appgold" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Local Merchants</h3>
                <p className="text-gray-400">Supporting local businesses in your area</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-12 px-4 bg-appgray/50">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Shop by Categories</h2>
              <Link to="/categories" className="text-appgold hover:underline flex items-center">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.map((category) => (
                <Link to={`/category/${category.id}`} key={category.id}>
                  <div className="app-card p-4 h-32 flex flex-col items-center justify-center text-center transition-all hover:border-appgold hover:shadow-lg duration-300">
                    <span className="text-3xl mb-2">{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Products Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <Link to="/shop" className="text-appgold hover:underline flex items-center">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <ProductList products={featuredProducts} isLoading={isLoading} />
          </div>
        </section>
        
        {/* Best Selling Products Section */}
        <section className="py-16 px-4 bg-appgray/50">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Best Selling Products</h2>
              <Link to="/shop" className="text-appgold hover:underline flex items-center">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <ProductList products={bestSellingProducts} isLoading={isLoading} />
          </div>
        </section>
        
        {/* Merchant Banner Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="app-card overflow-hidden">
              <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 z-10">
                  <div className="inline-block bg-appgold/20 text-appgold text-sm px-3 py-1 rounded-full mb-4">
                    For Merchants
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">
                    Grow Your Business with Grocery Bazaar
                  </h2>
                  <p className="text-gray-300 mb-6 max-w-lg">
                    Join our platform to reach more customers, manage orders efficiently, and grow your grocery business online.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="app-button">
                      <ShoppingBag className="mr-2" size={18} />
                      Register as Merchant
                    </Button>
                    <Button variant="outline" className="border-appgold text-appgold hover:bg-appgold hover:text-appbg">
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/3 mt-8 md:mt-0 md:absolute md:right-0 md:top-0 md:bottom-0">
                  <img 
                    src="https://source.unsplash.com/random/600x600/?store" 
                    alt="Merchant store" 
                    className="h-full w-full object-cover rounded-lg md:rounded-l-none md:rounded-r-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
