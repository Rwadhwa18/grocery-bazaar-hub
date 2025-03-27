
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Mail, Lock, Store } from 'lucide-react';
import AuthLayout from './AuthLayout';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';

const MerchantLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate login for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Merchant login successful",
        description: "Welcome back to GrocMerchants!",
      });
      
      navigate('/merchant/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Merchant Login" 
      subtitle="Welcome back! Log in to manage your store"
    >
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-appgold/20 rounded-full">
          <Store className="text-appgold" size={32} />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              id="email" 
              type="email" 
              placeholder="your@email.com" 
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link to="/merchant/forgot-password" className="text-xs text-appgold hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full app-button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-500/30"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-appgray px-2 text-gray-400">OR</span>
          </div>
        </div>
        
        <GoogleLoginButton 
          userType="merchant" 
          onSuccess={() => navigate('/merchant/dashboard')} 
        />
        
        <div className="text-center text-sm text-gray-400 mt-6">
          Don't have a merchant account?{' '}
          <Link to="/merchant/register" className="text-appgold hover:underline">
            Register now
          </Link>
        </div>
        
        <div className="text-center text-sm text-gray-400 mt-2">
          Want to shop on GrocMerchants?{' '}
          <Link to="/login" className="text-appgold hover:underline">
            Login as Customer
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default MerchantLogin;
