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
          if (key === "categories"){
            value.forEach((category: string) => {formData.append("categories[]", category)});
          }else{
            formData.append(key, value);
          }
        })

      return this.http.post('http://localhost:5000/api/products', formData, {headers: headers, observe: 'response'})
      .pipe(map(res => res));
    }

    //get products
    getProducts(category: string | null){
      let queryParam;

      if (category){
        //for searching products in one category
        queryParam = "?category="+category;
      }else{
        queryParam = "";
      }
      return this.http.get<any>("http://localhost:5000/api/products"+queryParam)
      .pipe(map((res:any)=>{
        return res;
      }))
    }
}
