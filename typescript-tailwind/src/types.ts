export type Availability = "in-stock" | "low-stock" | "out-of-stock";

// Mirrors CATEGORIES in the multivendor-ecommerce-backend ERD
export interface Category {
  id: number;
  name: string;
}

// Mirrors PRODUCTS in the multivendor-ecommerce-backend ERD
export interface Product {
  id: number;
  sellerId: number;
  categoryId: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  isActive: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}