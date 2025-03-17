
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-appgray border-t border-appgray/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Logo size="large" showTagline={true} />
            <p className="text-gray-400 mt-4">
              Your one-stop shop for fresh groceries and everyday essentials, delivered right to your doorstep.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-appgold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-appgold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-appgold transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-appgold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-appgold transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-appgold transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-appgold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-appgold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-appgold transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-appgold transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-appgold transition-colors">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-appgold transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-appgold transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-appgold mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Grocery Lane, Fresh City, FC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-appgold mr-2 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-appgold mr-2 flex-shrink-0" />
                <span className="text-gray-400">support@grocerybazaar.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-appgray/50 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Grocery Bazaar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
