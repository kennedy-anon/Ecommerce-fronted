import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: any=[];
  orderDetails: any;
  loadingDetails: boolean = false;
  fetchingOrders: boolean = true; // spinner for loading orders
  loadingId!: string;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe(res=>{
      this.orderHistory = res;
      this.orderHistory = this.orderHistory.reverse();
      this.fetchingOrders = false;  // stop loading spinner
    })
  }

  // view order items
  viewOrderItems(orderID: string){
    this.loadingDetails = true; // show progress bar
    this.loadingId = orderID;

    this.orderService.getProductDetails(orderID).subscribe(res => {
      this.orderDetails = res;
      this.loadingDetails = false; // stop progress bar
    })
  }

}
