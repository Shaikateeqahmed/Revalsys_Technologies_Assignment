export interface ProductSpecification {
  connectivity?: string;
  batteryLife?: string;
  weight?: string;
  warranty?: string;
  noiseCancellation?: boolean;
  waterResistance?: string;
  [key: string]: string | boolean | undefined;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: 'Headphones' | 'Earbuds' | 'Speakers' | 'Accessories';
  isFeatured: boolean;
  inStock: boolean;
  images: string[];
  specs: ProductSpecification;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isGuest: boolean;
}

export interface ProductFilterState {
  searchQuery: string;
  category: string;
  priceRange: [number, number];
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'featured';
}
