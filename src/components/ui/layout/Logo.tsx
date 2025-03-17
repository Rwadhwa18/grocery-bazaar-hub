
import { ShoppingBasket } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo = ({ size = 'medium' }: LogoProps) => {
  const sizeClasses = {
    small: 'text-xl gap-1',
    medium: 'text-2xl gap-2',
    large: 'text-3xl gap-3'
  };

  return (
    <Link to="/" className={`flex items-center ${sizeClasses[size]}`}>
      <div className="relative">
        <ShoppingBasket className="text-appgold" size={size === 'small' ? 24 : size === 'medium' ? 30 : 36} />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-appgold rounded-full border border-appbg"></div>
      </div>
      <div className="flex items-center">
        <span className="font-bold text-appgold">Grocery</span>
        <span className="font-bold text-appfg">Bazaar</span>
      </div>
    </Link>
  );
};

export default Logo;
