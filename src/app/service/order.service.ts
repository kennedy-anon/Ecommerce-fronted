import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderDetails = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) { }

  //set headers with access token
  setRequestHeaders(){
    const access_token = localStorage.getItem('access_token');
    var headers = new HttpHeaders({
      'token': `Bearer ${access_token}`
    });

    headers.append('Content-type', 'application/json');

    return headers
  }

  //placing order
  placeOrder(products: any, grandTotal: number, address: string){
    const userId = localStorage.getItem('user_id');
    var headers = this.setRequestHeaders();

    let items: { [key: string]: any }[] = [];

    //selecting only product id and quantity
    for (let product of products){
      items.push({productId: product._id, quantity: product.quantity});
    }

    const order ={
      userId: userId,
      products: items,
      amount: grandTotal,
      address: address
    }

    return this.http.post('http://localhost:5000/api/orders', order, {headers: headers, observe: 'response'})
      .pipe(map(res =>{ 
        this.orderDetails.next(res);
        }));
  }

  //get order details
  getOrderDetails(){
    return this.orderDetails.asObservable();
  }

  //counts the number of items in an order
  getItemCount(orderHistory: any=[]) : number{
    orderHistory.map((order:any)=>{
      let itemCount = 0;
      order.products.map((product:any)=>{
        itemCount += product.quantity
      })

      //appending item count on each order
      Object.assign(order, {itemCount: itemCount});
    })
    return orderHistory;
  }

  //fetch user orders by userId
  getUserOrders(){
    const id = localStorage.getItem('user_id');
    var headers = this.setRequestHeaders();

    return this.http.get<any>("http://localhost:5000/api/orders/find/"+id, {headers: headers})
      .pipe(map((res:any)=>{
        return this.getItemCount(res);
      }))
  }
}

