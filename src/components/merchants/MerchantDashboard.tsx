
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PackagePlus, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  FileImage, 
  Tags,
  MapPin,
  ArrowLeft,
  Store
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const MerchantDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [shopImagePreview, setShopImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShopImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setShopImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Product Added",
      description: "Your product has been successfully added to the inventory",
      duration: 3000,
    });
    
    // Reset form (in a real app)
    setImagePreview(null);
  };

  const handleUpdateShopImage = () => {
    toast({
      title: "Shop Image Updated",
      description: "Your shop image has been successfully updated",
      duration: 3000,
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Merchant Dashboard</h1>
        <Button 
          variant="outline" 
          onClick={handleGoBack} 
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      </div>

      {/* Shop Image Card */}
      <Card className="bg-appgray border-appgray mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store size={20} className="text-appgold" />
            Shop Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center h-60">
                {shopImagePreview ? (
                  <div className="relative h-full">
                    <img 
                      src={shopImagePreview} 
                      alt="Shop preview" 
                      className="mx-auto h-full object-cover rounded-md" 
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 absolute bottom-0 left-1/2 transform -translate-x-1/2"
                      onClick={() => setShopImagePreview(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Store className="h-12 w-12 text-gray-400 mb-2" />
                    <div className="text-sm text-gray-400 mb-2">
                      Upload your shop image
                    </div>
                    <Input
                      id="shop-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleShopImageChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('shop-image')?.click()}
                    >
                      <FileImage size={16} className="mr-2" />
                      Browse
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shop-name">Shop Name</Label>
                  <Input id="shop-name" placeholder="e.g. Nature's Best Groceries" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shop-description">Shop Description</Label>
                  <Textarea 
                    id="shop-description" 
                    placeholder="Brief description about your shop"
                    className="resize-none min-h-[100px]" 
                  />
                </div>
                <Button 
                  onClick={handleUpdateShopImage} 
                  className="app-button"
                  disabled={!shopImagePreview}
                >
                  Update Shop Profile
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-appgray border-appgray">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹21,459</div>
              <div className="p-2 bg-green-500/10 rounded-full">
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-appgray border-appgray">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">48</div>
              <div className="p-2 bg-appgold/10 rounded-full">
                <ShoppingBag className="h-4 w-4 text-appgold" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">5 new this week</p>
          </CardContent>
        </Card>
        
        <Card className="bg-appgray border-appgray">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">156</div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Users className="h-4 w-4 text-blue-500" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">+24 new customers</p>
          </CardContent>
        </Card>
        
        <Card className="bg-appgray border-appgray">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12</div>
              <div className="p-2 bg-orange-500/10 rounded-full">
                <Clock className="h-4 w-4 text-orange-500" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">4 need attention</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="add-product" className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="add-product" className="flex-1">Add Product</TabsTrigger>
          <TabsTrigger value="inventory" className="flex-1">Inventory</TabsTrigger>
          <TabsTrigger value="orders" className="flex-1">Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add-product">
          <Card className="bg-appgray border-appgray shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PackagePlus size={20} className="text-appgold" />
                Add New Product
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input id="product-name" placeholder="e.g. Organic Red Apples" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="product-description">Description</Label>
                      <Textarea 
                        id="product-description" 
                        placeholder="Brief description about the product"
                        className="resize-none min-h-[100px]" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-price">Price (₹)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <Input id="product-price" type="number" min="0" step="0.01" className="pl-9" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="product-original-price">Original Price (Optional)</Label>
                        <Input id="product-original-price" type="number" min="0" step="0.01" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-quantity">Quantity</Label>
                        <Input id="product-quantity" type="text" placeholder="e.g. 100" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="product-unit">Unit</Label>
                        <Input id="product-unit" type="text" placeholder="e.g. g, kg, ml" required />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-image">Product Image</Label>
                      <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center">
                        {imagePreview ? (
                          <div className="relative">
                            <img 
                              src={imagePreview} 
                              alt="Product preview" 
                              className="mx-auto h-40 object-contain" 
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => setImagePreview(null)}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <div className="py-4">
                            <FileImage className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                            <div className="text-sm text-gray-400 mb-2">
                              Drag and drop an image, or click to browse
                            </div>
                            <Input
                              id="product-image"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById('product-image')?.click()}
                            >
                              Upload Image
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="product-category">Category</Label>
                      <div className="relative">
                        <Tags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <Input id="product-category" className="pl-9" placeholder="e.g. Fruits, Dairy, Beverages" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="product-location">Store Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <Input id="product-location" className="pl-9" placeholder="e.g. Mumbai, Delhi" required />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="app-button px-8">
                    <PackagePlus size={18} className="mr-2" />
                    Add Product
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card className="bg-appgray border-appgray">
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-8 text-center">Inventory management features will be implemented here.</p>
              <div className="flex justify-center">
                <Button variant="outline" disabled>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card className="bg-appgray border-appgray">
            <CardHeader>
              <CardTitle>Orders Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-8 text-center">Orders management features will be implemented here.</p>
              <div className="flex justify-center">
                <Button variant="outline" disabled>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MerchantDashboard;
