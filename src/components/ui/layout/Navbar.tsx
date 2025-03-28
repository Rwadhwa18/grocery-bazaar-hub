import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/AuthModal';
import Logo from './Logo';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleOpenAuth = (type: 'login' | 'register') => {
    setAuthType(type);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="w-full bg-appbg sticky top-0 z-50 border-b border-appgray">
        <div className="container mx-auto px-4 py-3">
          {/* Top nav with pages */}
          <div className="flex items-center justify-between mb-2">
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/products">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Products
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about-us">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      About Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/terms">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Terms & Conditions
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="hidden md:flex ml-auto gap-2">
              <Link to="/merchant/login">
                <Button variant="ghost" size="sm" className="text-sm">
                  Merchant Login
                </Button>
              </Link>
              <Link to="/merchant/register">
                <Button variant="ghost" size="sm" className="text-sm">
                  Become a Merchant
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Logo showTagline={true} />

            <div className={`hidden md:flex items-center flex-1 mx-8 relative ${isSearchFocused ? 'ring-2 ring-appgold' : ''}`}>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search by Product, Brand, Category..."
                  className="w-full app-input py-2 pl-10 pr-4 rounded-full bg-appgray/80"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart size={24} className="text-appfg" />
                  <span className="absolute -top-1 -right-1 bg-appgold text-xs text-appbg rounded-full h-5 w-5 flex items-center justify-center">
                    2
                  </span>
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="border border-appgold text-appgold hover:bg-appgold hover:text-appbg transition-all"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="app-button">
                  Register
                </Button>
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <Link to="/cart" className="mr-4 relative">
                <ShoppingCart size={24} className="text-appfg" />
                <span className="absolute -top-1 -right-1 bg-appgold text-xs text-appbg rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          <div className="mt-3 md:hidden">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full app-input py-2 pl-10 pr-4 rounded-full bg-appgray/80"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-appbg animate-fade-in">
          <div className="pt-20 p-4 flex flex-col h-full">
            <nav className="flex flex-col gap-4 text-lg">
              <Link to="/" className="p-3 hover:bg-appgray rounded-md" onClick={toggleMenu}>Home</Link>
              <Link to="/products" className="p-3 hover:bg-appgray rounded-md" onClick={toggleMenu}>Products</Link>
              <Link to="/shop" className="p-3 hover:bg-appgray rounded-md" onClick={toggleMenu}>Shop</Link>
              <Link to="/categories" className="p-3 hover:bg-appgray rounded-md" onClick={toggleMenu}>Categories</Link>
              <Link to="/about-us" className="p-3 hover:bg-appgray rounded-md" onClick={toggleMenu}>About Us</Link>
              <Link to="/terms" className="p-3 hover:bg-appgray rounded-md" onClick={toggleMenu}>Terms & Conditions</Link>
              <Link to="/profile" className="p-3 hover:bg-appgray rounded-md" onClick={toggleMenu}>Profile</Link>
              <div className="border-t border-appgray my-4 pt-4">
                <Link to="/login">
                  <Button 
                    className="w-full app-button mb-3" 
                    onClick={toggleMenu}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    variant="outline" 
                    className="w-full border-appgold text-appgold" 
                    onClick={toggleMenu}
                  >
                    Register
                  </Button>
                </Link>
                <div className="mt-4 pt-4 border-t border-appgray">
                  <p className="text-sm text-gray-400 mb-2">For Merchants:</p>
                  <Link to="/merchant/login">
                    <Button 
                      variant="outline" 
                      className="w-full mb-2 border-appgold/50 text-appgold/90" 
                      onClick={toggleMenu}
                    >
                      Merchant Login
                    </Button>
                  </Link>
                  <Link to="/merchant/register">
                    <Button 
                      variant="outline" 
                      className="w-full border-appgold/50 text-appgold/90" 
                      onClick={toggleMenu}
                    >
                      Become a Merchant
                    </Button>
                  </Link>
                </div>
              </div>
            </nav>
            <div className="mt-auto p-4 text-center text-sm text-gray-400">
              <p>© {new Date().getFullYear()} GrocMerchants</p>
              <p>All rights reserved</p>
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialView={authType}
      />
    </>
  );
};

export default Navbar;
