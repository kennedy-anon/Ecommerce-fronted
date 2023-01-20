import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderDetails = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) { }

  //placing order
  placeOrder(products: any, grandTotal: number, address: string){
    const access_token = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');

    var headers = new HttpHeaders({
      'token': `Bearer ${access_token}`
    });

    headers.append('Content-type', 'application/json');

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

  //fetch user orders by userId.... start here
  getUserOrders(userId: string){
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get<any>("http://localhost:5000/api/products/findByTitle/"+userId)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
}

