
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Google } from 'lucide-react';

interface GoogleLoginButtonProps {
  variant?: 'default' | 'outline';
  fullWidth?: boolean;
  userType?: 'customer' | 'merchant';
  onSuccess?: () => void;
}

const GoogleLoginButton = ({ 
  variant = 'outline', 
  fullWidth = true, 
  userType = 'customer',
  onSuccess
}: GoogleLoginButtonProps) => {
  const handleGoogleLogin = async () => {
    try {
      // Simulate Google authentication for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Google login successful",
        description: `Welcome back to GrocMerchants as ${userType}!`,
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Could not authenticate with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      type="button" 
      variant={variant} 
      className={`${fullWidth ? 'w-full' : ''} flex items-center justify-center gap-2 ${variant === 'outline' ? 'border-gray-400 hover:bg-appgray/80' : ''}`}
      onClick={handleGoogleLogin}
    >
      <Google size={18} />
      <span>Continue with Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
