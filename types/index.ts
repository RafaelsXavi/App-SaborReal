export enum UserRole {
  Customer = 'customer',
  RestaurantAdmin = 'restaurant_admin',
  SuperAdmin = 'super_admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  role: UserRole;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  reference?: string;
  city: string;
  state: string;
  neighborhood?: string;
  isDefault: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  oldPrice?: number;
  isPopular?: boolean;
  restaurantId: string;
}
