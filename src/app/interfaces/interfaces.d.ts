interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface User{
  id: number | `${string}-${string}-${string}-${string}-${string}`;
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

interface Credentials {
  email: string;
  password: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
