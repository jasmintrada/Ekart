import { Product } from './Product';

export class Cart{
    id:number;
    userId:number;
    product:Product;
    quantity:number;
    totalProductPrice:number;
    cartPrice:number;
}