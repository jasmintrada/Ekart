import { OrderDetails } from './OrderDetails';

export class Order{
    id:number;
    userId:number;
    total:number;
    orderStatus:string;
    orderedDate:Date;
    deliveryDate:Date;
    returnDate:Date;
    cancelledDate:Date;
    btnReviewProduct:boolean;
    btnReviewSeller:boolean;
    btnCancel:boolean;
    btnReturn:boolean;
    orderDetails:Array<OrderDetails>;
}