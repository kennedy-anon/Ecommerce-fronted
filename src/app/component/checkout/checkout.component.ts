import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  address !: string;
  grandTotal: number = 0;
  itemCount: number = 0;
  products: any;

  constructor(private cartService: CartService, private orderService: OrderService, private route: Router) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      this.itemCount = this.cartService.getItemCount();
    })
  }

  placeOrder(products: any, grandTotal:number, address: string){
    if (this.itemCount != 0){
      this.orderService.placeOrder(products, grandTotal, address)
      .subscribe(res =>{
      //console.log(res);
      this.cartService.removeAllCart();
      });
      this.route.navigate(['/orderConfirmation']);
    }else{
      window.alert('Your Cart is empty. Kindly add to cart items to order.');
    }
    
  }

}
