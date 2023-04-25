import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //apiUrl: string = 'http://localhost:5000/'
  apiUrl: string = 'https://ecommerce-rest-api.cyclic.app/'

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
      this.incrementProductQuantity(product);
    }else{
      this.cartItemList.push(product);
    }

    this.productList.next(this.cartItemList);
  }

  //increments the quantity for a product
  incrementProductQuantity(product: any){
    this.cartItemList.map((item:any)=>{
      if (product._id == item._id){
        item.quantity += 1;
        item.total = item.quantity * item.price;
      }
    })

    this.productList.next(this.cartItemList);
  }

  //decrements the quantity for a product
  decrementProductQuantity(product: any){
    this.cartItemList.map((item:any)=>{
      if ((product._id == item._id) && (item.quantity > 1)){
        item.quantity -= 1;
        item.total = item.quantity * item.price;
      }
    })

    this.productList.next(this.cartItemList);
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((item:any)=>{
      grandTotal += item.total;
    })
    return grandTotal;
  }

  //counts the number of items in the cart
  getItemCount() : number{
    let itemCount = 0;
    this.cartItemList.map((item:any)=>{
      itemCount += item.quantity;
    })
    return itemCount;
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
