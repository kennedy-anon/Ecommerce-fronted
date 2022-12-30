import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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
    .pipe(map(res => res));
}
}
