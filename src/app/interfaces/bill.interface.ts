import { Product } from "./product.interface";

 export interface Bill {
  id: string;
  customerName: string;
  phone: number;
  products: Product[];
  totalPrice: number;
 }
