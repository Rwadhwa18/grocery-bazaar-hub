
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { User, Mail, Lock, MapPin, Phone, Store, FileText } from 'lucide-react';
import AuthLayout from './AuthLayout';

const MerchantRegister = () => {
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate registration for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Registration successful",
        description: "You can now set up your store",
      });
      
      // Redirect to merchant setup page instead of login
      navigate('/merchant/setup');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Register as Merchant" 
      subtitle="Start selling your products on GrocMerchants"
    >
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-appgold/20 rounded-full">
          <Store className="text-appgold" size={32} />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="storeName">Store Name</Label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              id="storeName" 
              type="text" 
              placeholder="Your Store Name" 
              className="pl-10"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              id="ownerName" 
              type="text" 
              placeholder="John Doe" 
              className="pl-10"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              required
            />
          </div>
        </div>
        
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
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+91 9876543210" 
              className="pl-10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
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
        
        <div className="space-y-2">
          <Label htmlFor="address">Store Address</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
            <Textarea 
              id="address" 
              placeholder="Your store address" 
              className="pl-10 min-h-[80px]"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Store Description</Label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
            <Textarea 
              id="description" 
              placeholder="Tell us about your store and what you sell" 
              className="pl-10 min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full app-button" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Register as Merchant'}
        </Button>
        
        <div className="text-center text-sm text-gray-400 mt-4">
          Already have a merchant account?{' '}
          <Link to="/merchant/login" className="text-appgold hover:underline">
            Login now
          </Link>
        </div>
        
        <div className="text-center text-sm text-gray-400 mt-2">
          Want to shop on GrocMerchants?{' '}
          <Link to="/register" className="text-appgold hover:underline">
            Register as Customer
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default MerchantRegister;
