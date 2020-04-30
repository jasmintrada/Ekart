import { Product } from './Product';

export class OrderDetails{
    id:number;
    orderId:number;
    userId:number;
    product:Product;
    quantity:number;
    price:number;
}