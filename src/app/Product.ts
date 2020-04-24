import { Rating } from './Rating';

export class Product{
    id:number;
    displayName:String;
    desc:String;
    shortDesc:String;
    category:String;
    price:number;
    discount:number;
    deliveryCharge:number;
    offerPrice:number;
    avgRating:number;
    ratings:Array<Rating>;
}