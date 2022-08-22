import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList: any;

  constructor(private api: ApiService, private cartService: CartService, private productService: ProductService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    /*this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;

      this.productList.forEach((a: any) => {
        Object.assign(a, {quantity:1, total:a.price});
      });
    })*/

    this.productService.getProducts()
    .subscribe(res=>{
      this.productList = res;
      this.productList.forEach((oneProduct: any) => {
        //convert image buffer to base64 url
        const base64String = btoa(new Uint8Array(oneProduct.img.data.data).reduce((data, byte)=> {
          return data + String.fromCharCode(byte);
          }, '')
        );
        oneProduct.img.data = base64String;

        //appending parameters to be used on cart
        Object.assign(oneProduct, {quantity:1, total:oneProduct.price});

        });
    })
  }

  addtocart(item: any){
    this.cartService.addToCart(item);
    this._snackBar.open('Added to cart.', '', {
      duration: 1000,
      panelClass: ['styleSnackBar'],
    });

    
  }

}
