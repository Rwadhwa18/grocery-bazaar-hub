
import { Product, ProductVariant } from './types';

// Helper function to create a default variant based on product data
const createDefaultVariant = (
  id: string,
  price: number,
  originalPrice?: number,
  unit?: string,
  quantity?: string | number
): ProductVariant => {
  let weightValue = 1;
  let weightUnit = 'unit';
  
  // Try to parse quantity into numeric value and unit
  if (quantity) {
    if (typeof quantity === 'string') {
      const numValue = parseFloat(quantity);
      if (!isNaN(numValue)) {
        weightValue = numValue;
      }
    } else {
      weightValue = quantity;
    }
  }
  
  // Use the unit from product if available
  if (unit) {
    weightUnit = unit;
  }
  
  return {
    id: `v-${id}`,
    barcode: `PROD-${id}`,
    rating: 4.0,
    weightValue,
    weightUnit,
    price,
    mrp: originalPrice || price,
    stock: 50
  };
};

// Function to convert legacy product data to include variants
export const ensureProductVariants = (product: Partial<Product>): Product => {
  // Create a copy of the product to avoid mutating the original
  const updatedProduct = { ...product } as Product;
  
  // If variants don't exist, create a default one based on the product data
  if (!updatedProduct.variants || updatedProduct.variants.length === 0) {
    updatedProduct.variants = [
      createDefaultVariant(
        updatedProduct.id || '0',
        updatedProduct.price,
        updatedProduct.originalPrice,
        updatedProduct.unit,
        updatedProduct.quantity
      )
    ];
  }
  
  return updatedProduct;
};

// Function to standardize a list of products (ensure all have variants)
export const standardizeProducts = (products: Partial<Product>[]): Product[] => {
  return products.map(product => ensureProductVariants(product));
};
