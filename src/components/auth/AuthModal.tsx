
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserRole } from '@/lib/types';
import { User, Lock, MapPin, Mail, Store, UserPlus } from 'lucide-react';
import GoogleLoginButton from './GoogleLoginButton';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, initialView }: AuthModalProps) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [activeTab, setActiveTab] = useState(initialView);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    console.log('Login attempted');
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate register
    console.log('Register attempted as', role);
    onClose();
  };

  const handleGoogleSuccess = () => {
    onClose();
    if (role === 'merchant') {
      navigate('/merchant/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-appgray border-appgray text-appfg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-appgold">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={initialView} className="w-full" onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-0">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-appgold hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full app-button">
                Login
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
                userType={role} 
                onSuccess={handleGoogleSuccess} 
              />
              
              <div className="text-center text-sm text-gray-400 mt-4">
                Don't have an account?{' '}
                <button 
                  type="button" 
                  className="text-appgold hover:underline"
                  onClick={() => setActiveTab('register')}
                >
                  Register now
                </button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="mt-0">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">I am a:</Label>
                <RadioGroup 
                  defaultValue="customer" 
                  className="flex gap-4" 
                  onValueChange={(value) => setRole(value as UserRole)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="customer" id="customer" />
                    <Label htmlFor="customer" className="flex items-center gap-1">
                      <User size={16} /> Customer
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="merchant" id="merchant" />
                    <Label htmlFor="merchant" className="flex items-center gap-1">
                      <Store size={16} /> Merchant
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="your@email.com" 
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    id="register-password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    id="location" 
                    type="text" 
                    placeholder="Your address" 
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full app-button">
                <UserPlus size={18} />
                Create Account
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
                userType={role} 
                onSuccess={handleGoogleSuccess} 
              />
              
              <div className="text-center text-sm text-gray-400 mt-4">
                Already have an account?{' '}
                <button 
                  type="button" 
                  className="text-appgold hover:underline"
                  onClick={() => setActiveTab('login')}
                >
                  Login now
                </button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
