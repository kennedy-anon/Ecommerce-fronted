import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any =[]
  public productList = new BehaviorSubject<any>([]);

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  } 

  setProduct(product: any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  //Adds products to the cart
  addToCart(product: any){
    const currentItem = this.cartItemList.find((item: any) => item._id === product._id);
    if (currentItem){
      //Increments the quantity for a product arleady in cart
      this.cartItemList.map((item:any)=>{
        if (product._id == item._id){
          item.quantity += 1;
          item.total = item.quantity * item.price;
        }
      })
    }else{
      this.cartItemList.push(product);
    }

    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((item:any)=>{
      grandTotal += item.total;
    })
    return grandTotal;
  }

  removeCartItem(product: any){
    this.cartItemList.map((item:any, index:any)=>{
      if (product._id === item._id){
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
