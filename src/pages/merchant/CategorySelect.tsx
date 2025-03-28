
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/layout/Footer';
import { ShoppingBag, PizzaIcon, Shirt, Pill, Apple, ShoppingCart, Coffee, Gift } from 'lucide-react';

// Store category options
const storeCategories = [
  { id: 'grocery', name: 'Grocery Store', icon: <ShoppingBag size={40} /> },
  { id: 'restaurant', name: 'Restaurant', icon: <PizzaIcon size={40} /> },
  { id: 'clothing', name: 'Clothing Store', icon: <Shirt size={40} /> },
  { id: 'pharmacy', name: 'Pharmacy', icon: <Pill size={40} /> },
  { id: 'fruits', name: 'Fruits & Vegetables', icon: <Apple size={40} /> },
  { id: 'supermarket', name: 'Supermarket', icon: <ShoppingCart size={40} /> },
  { id: 'cafe', name: 'Cafe', icon: <Coffee size={40} /> },
  { id: 'other', name: 'Other', icon: <Gift size={40} /> },
];

const CategorySelect = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleContinue = () => {
    if (!selectedCategory) {
      toast({
        title: "Category required",
        description: "Please select a store category",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call to save the category
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Store the selected category in localStorage for now
      localStorage.setItem('merchantCategory', selectedCategory);
      
      // Redirect to merchant setup page
      navigate('/merchant/setup');
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Select Your Store Category</h1>
            <p className="text-gray-400">Choose the category that best describes your business</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {storeCategories.map((category) => (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all border-2 hover:border-appgold ${
                  selectedCategory === category.id 
                    ? 'border-appgold bg-appgold/10' 
                    : 'border-appgray bg-appgray'
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardContent className="p-4 text-center flex flex-col items-center justify-center min-h-[140px]">
                  <div className={`mb-3 ${selectedCategory === category.id ? 'text-appgold' : 'text-gray-400'}`}>
                    {category.icon}
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button 
              className="app-button px-10" 
              onClick={handleContinue}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Continue to Setup'}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategorySelect;
