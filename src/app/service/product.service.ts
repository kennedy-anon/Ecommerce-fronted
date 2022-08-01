import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

    //Add product
    addProduct(newProduct: any){
      const access_token = localStorage.getItem('access_token');
  
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'token': `Bearer ${access_token}`
      });
      return this.http.post('http://localhost:5000/api/products', newProduct, {headers: headers, observe: 'response'})
      .pipe(map(res => res));
    }
}
