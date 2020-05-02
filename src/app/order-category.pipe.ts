import { Pipe, PipeTransform } from '@angular/core';
import { Order } from './Order';

@Pipe({
  name: 'orderCategory'
})
export class OrderCategoryPipe implements PipeTransform {

  transform(value: Order[], args?: string): Order[] {
    if(args.startsWith("Open")){
      return value.filter(order=>!order.btnCancel&&!order.btnReturn&&order.deliveryDate == undefined);
    }else if(args.startsWith("Delivered")){
      return value.filter(order=>order.deliveryDate instanceof Date);
    }else if(args.startsWith("Cancelled")){

      return value.filter(order=>order.btnCancel);
    }else if(args.startsWith("Returned")){

      return value.filter(order=>order.btnReturn);
    }
    return value;
  }

}
