import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderDetails: any;

  constructor(private orderService: OrderService) { }

  //checks if orderDetails is empty
  isEmpty(){
    if (Object.keys(this.orderDetails).length === 0 && this.orderDetails.constructor === Object){
      return true;
    }else{
      return false;
    }
  }

  ngOnInit(): void {
    this.orderService.getOrderDetails().subscribe(res=>{
      this.orderDetails = res;
    });
  }

}
