import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  itemCount: number = 0;

  constructor(private cartService: CartService, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      this.itemCount = this.cartService.getItemCount();
    })
  }

  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }

  emptyCart(){
    this.cartService.removeAllCart();
  }

  incrementItemQuantity(item: any){
    this.cartService.incrementProductQuantity(item);
  }

  decrementItemQuantity(item: any){
    this.cartService.decrementProductQuantity(item);
  }

  checkOut(){
    if (this.authService.isNotExpired()){
      this.route.navigate(['/checkout']);
    }else{
      this.route.navigate(['/login']);
    }
  }

}
