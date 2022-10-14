import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList: any; 
  categoryName!: string | null; queryNew!: number;
  queryMade!: string | null;

  constructor(private cartService: CartService, private productService: ProductService, private _snackBar: MatSnackBar, private route: ActivatedRoute) { }

  //Fetches products as specified by the query parameters
  fetchProducts(queryPassed: string | null){
    this.productService.getProducts(queryPassed)
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

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryName = params['category'];
      this.queryNew = params['new'];

      if (this.categoryName){
        //fetches products by category name
        this.queryMade = "?category="+this.categoryName;
        this.fetchProducts(this.queryMade);
      }else if(this.queryNew){
        //fetches the new products
        this.queryMade = "?new=true";
        this.fetchProducts(this.queryMade);
      }else{
        //fetches all products
        this.fetchProducts(null);
      }
    });
    
  }

  addtocart(item: any){
    this.cartService.addToCart(item);
    this._snackBar.open('Added to cart.', '', {
      duration: 1000,
      panelClass: ['styleSnackBar'],
    });
  }

}
