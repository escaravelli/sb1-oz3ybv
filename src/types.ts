export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface QuoteRequest {
  customerName: string;
  phone: string;
  location: string;
  preferredDateTime: string;
  items: CartItem[];
}