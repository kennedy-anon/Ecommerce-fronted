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
        'token': `Bearer ${access_token}`
      });

      const formData = new FormData();
      Object.entries(newProduct).forEach(
        ([key, value]: any[]) => {
          formData.append(key, value);
        })

      return this.http.post('http://localhost:5000/api/products', formData, {headers: headers, observe: 'response'})
      .pipe(map(res => res));
    }
}
