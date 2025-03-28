
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Shirt, Apple, UtensilsCrossed, 
  Bath, Coffee, Wine, Pill, Home, Baby, Beef, Gift, 
  Droplets, Cigarette, Book, ShieldPlus
} from 'lucide-react';

const categories = [
  { id: 'grocery', name: 'Grocery', icon: ShoppingBag },
  { id: 'fashion', name: 'Fashion', icon: Shirt },
  { id: 'fruits-vegetables', name: 'Fruits & Vegetables', icon: Apple },
  { id: 'food', name: 'Food & Dining', icon: UtensilsCrossed },
  { id: 'personal-care', name: 'Personal Care', icon: Bath },
  { id: 'beverages', name: 'Beverages', icon: Coffee },
  { id: 'liquor', name: 'Liquor', icon: Wine },
  { id: 'medicine', name: 'Medicine', icon: Pill },
  { id: 'home-decor', name: 'Home & Decor', icon: Home },
  { id: 'baby-care', name: 'Baby Care', icon: Baby },
  { id: 'meat', name: 'Meat & Seafood', icon: Beef },
  { id: 'gifts', name: 'Gifts & Lifestyle', icon: Gift },
  { id: 'dairy', name: 'Dairy Products', icon: Droplets },
  { id: 'tobacco', name: 'Tobacco', icon: Cigarette },
  { id: 'books', name: 'Books & Stationery', icon: Book },
  { id: 'health', name: 'Health & Wellness', icon: ShieldPlus },
];

const CategoryList = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/shop?category=${categoryId}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            className="app-card flex flex-col items-center justify-center p-4 hover:border-appgold transition-colors"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="bg-appgray/50 p-3 rounded-full mb-3">
              <Icon size={24} className="text-appgold" />
            </div>
            <span className="text-sm font-medium text-center">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryList;
