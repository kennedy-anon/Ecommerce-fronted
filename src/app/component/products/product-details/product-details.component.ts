import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  title!: string;
  productDetails: any;
  stockLeft!: string;
  stockColor : string="green";

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  //fetches the product details of the title passed
  fetchProductDetails(title: string){
    this.productService.getProductByTitle(title).subscribe(res=>{
      this.productDetails = res;

      //convert image buffer to base64 url
      const base64String = btoa(new Uint8Array(this.productDetails.img.data.data).reduce((data, byte)=> {
        return data + String.fromCharCode(byte);
        }, '')
      );

      this.productDetails.img.data = base64String;

      if ((this.productDetails.size === "undefined") || (this.productDetails.size === "null")){
        this.productDetails.size = "";
      }

      if (this.productDetails.count <= 10){
        this.stockLeft = "Hurry, only a few left!"
        this.stockColor ="red";
      }else if(this.productDetails.count > 10){
        this.stockLeft = "In stock."
        this.stockColor ="green";
      }
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.title = params['title'];
      this.fetchProductDetails(this.title);
    })
  }

}
