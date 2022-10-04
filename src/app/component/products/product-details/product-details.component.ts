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
      console.log(this.productDetails);
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.title = params['title'];
      this.fetchProductDetails(this.title);
    })
  }

}
