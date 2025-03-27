
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { X, Plus, Upload, Store, MapPin, DollarSign, Phone, Mail, Clock } from 'lucide-react';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/layout/Footer';

const formSchema = z.object({
  storeName: z.string().min(2, { message: "Store name must be at least 2 characters long" }),
  storeDescription: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Valid zip code is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  openingHours: z.string().min(2, { message: "Opening hours are required" }),
});

type FormValues = z.infer<typeof formSchema>;

const MerchantSetup = () => {
  const navigate = useNavigate();
  const [storeImages, setStoreImages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: '',
      storeDescription: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: '',
      openingHours: '',
    },
  });

  const handleStoreImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Check if adding the new files would exceed the limit of 3
    if (storeImages.length + files.length > 3) {
      toast({
        title: "Upload limit exceeded",
        description: "You can upload a maximum of 3 store images",
        variant: "destructive",
      });
      return;
    }

    // Process each file
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoreImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeStoreImage = (index: number) => {
    setStoreImages(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      const result = form.trigger();
      if (!result) return;
      
      if (storeImages.length === 0) {
        toast({
          title: "Images required",
          description: "Please upload at least one store image",
          variant: "destructive",
        });
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Store setup complete",
        description: "Your store has been successfully set up",
      });
      
      navigate('/merchant/dashboard');
    } catch (error) {
      toast({
        title: "Failed to set up store",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Set Up Your Store</h1>
          
          <div className="flex justify-between mb-6">
            <div className={`flex-1 border-b-2 ${currentStep >= 1 ? 'border-appgold' : 'border-gray-700'} pb-2`}>
              <div className="flex items-center">
                <div className={`rounded-full w-8 h-8 flex items-center justify-center mr-2 ${currentStep >= 1 ? 'bg-appgold text-black' : 'bg-gray-700 text-white'}`}>1</div>
                <span>Store Details</span>
              </div>
            </div>
            <div className={`flex-1 border-b-2 ${currentStep >= 2 ? 'border-appgold' : 'border-gray-700'} pb-2`}>
              <div className="flex items-center">
                <div className={`rounded-full w-8 h-8 flex items-center justify-center mr-2 ${currentStep >= 2 ? 'bg-appgold text-black' : 'bg-gray-700 text-white'}`}>2</div>
                <span>Add Products</span>
              </div>
            </div>
          </div>
          
          {currentStep === 1 && (
            <div className="bg-appgray p-6 rounded-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="storeName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Store Name</FormLabel>
                            <div className="relative">
                              <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                              <FormControl>
                                <Input 
                                  placeholder="Your Store Name" 
                                  className="pl-10"
                                  {...field} 
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="storeDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Store Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your store and what you sell" 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <FormLabel>Store Images (Max 3)</FormLabel>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-4">
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {storeImages.map((image, index) => (
                              <div key={index} className="relative h-24 bg-gray-800 rounded-md overflow-hidden">
                                <img src={image} alt={`Store ${index + 1}`} className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => removeStoreImage(index)}
                                  className="absolute top-1 right-1 bg-black bg-opacity-70 rounded-full p-1"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                            {storeImages.length < 3 && Array(3 - storeImages.length).fill(0).map((_, index) => (
                              <div key={`empty-${index}`} className="h-24 bg-gray-800 rounded-md flex items-center justify-center">
                                <Plus size={20} className="text-gray-500" />
                              </div>
                            ))}
                          </div>
                          <div className="text-center">
                            <Input
                              id="store-images"
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleStoreImageUpload}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById('store-images')?.click()}
                              className="w-full"
                            >
                              <Upload size={18} className="mr-2" />
                              Upload Images
                            </Button>
                            <p className="text-xs text-gray-400 mt-2">
                              {storeImages.length}/3 images uploaded
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                              <FormControl>
                                <Input 
                                  placeholder="Street Address" 
                                  className="pl-10"
                                  {...field} 
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-3 gap-2">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="City" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="State" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zip Code</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Zip Code" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                              <FormControl>
                                <Input 
                                  placeholder="Phone Number" 
                                  className="pl-10"
                                  {...field} 
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Email</FormLabel>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                              <FormControl>
                                <Input 
                                  placeholder="Business Email" 
                                  className="pl-10"
                                  {...field} 
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="openingHours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Opening Hours</FormLabel>
                            <div className="relative">
                              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                              <FormControl>
                                <Input 
                                  placeholder="e.g. Mon-Fri: 9AM-6PM, Sat: 10AM-4PM" 
                                  className="pl-10"
                                  {...field} 
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="button" onClick={nextStep} className="app-button">
                      Continue to Add Products
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="bg-appgray p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Add Products to Your Store</h2>
              
              <div className="mb-8">
                <p className="text-gray-400 mb-4">
                  Start adding products to your store. You can add more products later from your merchant dashboard.
                </p>
                
                {/* Product Add Form - This will use the existing Add Product form from MerchantDashboard */}
                <div className="border border-gray-700 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Plus size={18} className="mr-2 text-appgold" /> 
                    Add New Product
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <FormLabel htmlFor="product-name">Product Name</FormLabel>
                        <Input id="product-name" placeholder="e.g. Organic Red Apples" />
                      </div>
                      
                      <div className="space-y-2">
                        <FormLabel htmlFor="product-description">Description</FormLabel>
                        <Textarea 
                          id="product-description" 
                          placeholder="Brief description about the product"
                          className="resize-none min-h-[100px]" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormLabel htmlFor="product-price">Price (₹)</FormLabel>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <Input id="product-price" type="number" min="0" step="0.01" className="pl-9" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <FormLabel htmlFor="product-original-price">Original Price (Optional)</FormLabel>
                          <Input id="product-original-price" type="number" min="0" step="0.01" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <FormLabel htmlFor="product-image">Product Image</FormLabel>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center">
                          <div className="py-4">
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                            <div className="text-sm text-gray-400 mb-2">
                              Click to upload product image
                            </div>
                            <Input
                              id="product-image"
                              type="file"
                              accept="image/*"
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById('product-image')?.click()}
                            >
                              Upload Image
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormLabel htmlFor="product-quantity">Quantity</FormLabel>
                          <Input id="product-quantity" type="text" placeholder="e.g. 100" />
                        </div>
                        
                        <div className="space-y-2">
                          <FormLabel htmlFor="product-unit">Unit</FormLabel>
                          <Input id="product-unit" type="text" placeholder="e.g. g, kg, ml" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button type="button" className="app-button">
                      <Plus size={18} className="mr-2" />
                      Add Product
                    </Button>
                  </div>
                </div>
                
                {/* Placeholder for products list */}
                <div className="text-center py-6 border border-gray-700 border-dashed rounded-lg">
                  <p className="text-gray-400">No products added yet</p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back to Store Details
                </Button>
                
                <Button 
                  type="button" 
                  className="app-button"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Setting up your store...' : 'Complete Setup'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MerchantSetup;
