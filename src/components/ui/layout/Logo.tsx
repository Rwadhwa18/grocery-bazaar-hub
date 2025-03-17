
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
}

const Logo = ({ size = 'medium', showTagline = false }: LogoProps) => {
  const sizeClasses = {
    small: 'text-xl gap-1',
    medium: 'text-2xl gap-2',
    large: 'text-3xl gap-3'
  };

  const logoSizes = {
    small: 30,
    medium: 40,
    large: 50
  };

  return (
    <div className="flex flex-col items-start">
      <Link to="/" className={`flex items-center ${sizeClasses[size]}`}>
        <img 
          src="/lovable-uploads/08918244-9efb-4ffc-afbe-66502b0eac7d.png" 
          alt="Groocease Logo" 
          width={logoSizes[size]} 
          height={logoSizes[size]} 
          className="rounded-lg"
        />
        <div className="flex items-center ml-2">
          <span className="font-bold text-appgold">Groc</span>
          <span className="font-bold text-appfg">Merchants</span>
        </div>
      </Link>
      {showTagline && (
        <div className="flex flex-col text-xs pl-1 mt-1">
          <span className="text-appgold italic">Kyo Na Bade Hum Bhi</span>
          <span className="text-gray-400">Get Your Own App</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
