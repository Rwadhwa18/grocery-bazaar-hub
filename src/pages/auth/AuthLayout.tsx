
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/ui/layout/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-appgray">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-appgold transition-colors mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        <div className="flex justify-center pb-8">
          <Logo size="large" showTagline={true} />
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="app-card w-full max-w-md p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-appgold">{title}</h1>
            <p className="text-gray-400 mt-2">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
