
import { useState } from 'react';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Package, Edit, Save, Plus, Trash2, 
  Search, ArrowUpDown, AlertCircle 
} from 'lucide-react';
import { Product, ProductVariant } from '@/lib/types';

// Sample data for demonstration
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Ashirvaad Aata",
    description: "Premium quality wheat flour",
    brand: "Ashirvaad",
    isVeg: true,
    categories: ["Grocery", "Staples"],
    imageUrl: "/placeholder.svg",
    imageUrls: ["/placeholder.svg"],
    category: "Grocery",
    merchantId: "m1",
    price: 200,
    originalPrice: 220,
    discountPercentage: 10,
    unit: "kg",
    quantity: "5",
    variants: [
      {
        id: "1a",
        barcode: "123456789",
        rating: 4.5,
        weightValue: 5,
        weightUnit: "kg",
        price: 200,
        mrp: 220,
        stock: 50
      },
      {
        id: "1b",
        barcode: "123456790",
        rating: 4.5,
        weightValue: 2,
        weightUnit: "kg",
        price: 100,
        mrp: 110,
        stock: 75
      }
    ]
  },
  {
    id: "2",
    name: "Tata Salt",
    description: "Iodized salt for cooking",
    brand: "Tata",
    isVeg: true,
    categories: ["Grocery", "Staples"],
    imageUrl: "/placeholder.svg",
    imageUrls: ["/placeholder.svg"],
    category: "Grocery",
    merchantId: "m1",
    price: 20,
    originalPrice: 25,
    discountPercentage: 20,
    unit: "kg",
    quantity: "1",
    variants: [
      {
        id: "2a",
        barcode: "123456791",
        rating: 4.2,
        weightValue: 1,
        weightUnit: "kg",
        price: 20,
        mrp: 25,
        stock: 100
      }
    ]
  }
];

const MerchantInventory = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);
  const [editedStock, setEditedStock] = useState<number>(0);
  const { toast } = useToast();
  
  const handleEditStock = (productId: string, variantId: string, currentStock: number) => {
    setEditingProductId(productId);
    setEditingVariantId(variantId);
    setEditedStock(currentStock);
  };
  
  const handleSaveStock = (productId: string, variantId: string) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          const updatedVariants = product.variants.map(variant => {
            if (variant.id === variantId) {
              return { ...variant, stock: editedStock };
            }
            return variant;
          });
          return { ...product, variants: updatedVariants };
        }
        return product;
      })
    );
    
    setEditingProductId(null);
    setEditingVariantId(null);
    
    toast({
      title: "Stock updated",
      description: "Product inventory has been updated successfully"
    });
  };
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getLowStockVariants = () => {
    let count = 0;
    products.forEach(product => {
      product.variants.forEach(variant => {
        if (variant.stock < 10) count++;
      });
    });
    return count;
  };
  
  const lowStockCount = getLowStockVariants();

  return (
    <div className="min-h-screen flex flex-col bg-appbg">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
            <p className="text-gray-400">Manage your product stock levels</p>
          </div>
          
          <Button className="app-button">
            <Plus size={18} className="mr-2" />
            Add New Product
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="app-card p-4">
            <h3 className="text-lg font-semibold mb-1">{products.length}</h3>
            <p className="text-gray-400">Total Products</p>
          </div>
          
          <div className="app-card p-4">
            <h3 className="text-lg font-semibold mb-1">
              {products.reduce((acc, product) => acc + product.variants.length, 0)}
            </h3>
            <p className="text-gray-400">Total Variants</p>
          </div>
          
          <div className="app-card p-4">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold mb-1">{lowStockCount}</h3>
              {lowStockCount > 0 && (
                <AlertCircle size={16} className="ml-2 text-red-500" />
              )}
            </div>
            <p className="text-gray-400">Low Stock Items</p>
          </div>
        </div>
        
        <div className="app-card p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 app-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>Inventory as of {new Date().toLocaleDateString()}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Stock
                      <ArrowUpDown size={16} className="ml-1" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.flatMap(product => 
                    product.variants.map(variant => (
                      <TableRow key={`${product.id}-${variant.id}`}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-appgray rounded-md overflow-hidden mr-2 flex-shrink-0">
                              {product.imageUrl ? (
                                <img 
                                  src={product.imageUrl} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover" 
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-appgray">
                                  <Package size={16} className="text-gray-500" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-xs text-gray-400">{product.brand}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{variant.weightValue} {variant.weightUnit}</TableCell>
                        <TableCell>₹{variant.price}</TableCell>
                        <TableCell>
                          {editingProductId === product.id && editingVariantId === variant.id ? (
                            <Input 
                              type="number" 
                              min="0" 
                              className="w-20 h-8 text-sm"
                              value={editedStock}
                              onChange={(e) => setEditedStock(parseInt(e.target.value) || 0)}
                            />
                          ) : (
                            <span className={variant.stock < 10 ? "text-red-500 font-medium" : ""}>
                              {variant.stock}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            variant.stock === 0 
                              ? "bg-red-500/10 text-red-500" 
                              : variant.stock < 10 
                                ? "bg-yellow-500/10 text-yellow-500" 
                                : "bg-green-500/10 text-green-500"
                          }`}>
                            {variant.stock === 0 
                              ? "Out of Stock" 
                              : variant.stock < 10 
                                ? "Low Stock" 
                                : "In Stock"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {editingProductId === product.id && editingVariantId === variant.id ? (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-green-500"
                              onClick={() => handleSaveStock(product.id, variant.id)}
                            >
                              <Save size={16} />
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditStock(product.id, variant.id, variant.stock)}
                            >
                              <Edit size={16} />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Package size={32} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-400">No products found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MerchantInventory;
