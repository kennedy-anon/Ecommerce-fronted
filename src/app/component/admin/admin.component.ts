import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username !: string;
  title !: string;
  desc !: string;
  img !: File;
  price !: number;
  count !: number;
  color !: string;
  size !: string;
  cat !: string;
  prod : any;

  constructor(private authService: AuthService, private productService: ProductService, private route: Router) { }

  logout(){
    this.authService.logOut();
    this.route.navigate(['/login']);
  }

  //transforming categories to array
  splitCat(){
    const categ = this.cat.split(",");

    for (var i in categ){
      if (categ[i].charAt(0) == " "){
        categ[i] = this.removeSpace(categ[i]);
      }

      console.log(categ[i]);
    }

    return categ;
  }

  //removing space that follows comma after splitting
  removeSpace(word: string){
    while (word.charAt(0) == " "){
      word = word.substring(1);
    }

    return word;
  }

  //add product
  addProduct(){
    let categorieS = this.splitCat(); //converting categories to an array

    const newProduct = {
      title: this.title,
      desc: this.desc,
      img: this.img,
      categories: categorieS,
      size: this.size,
      color: this.color,
      price: this.price,
      count: this.count
    }

    this.productService.addProduct(newProduct)
    .subscribe(product => {
      this.prod = product;
      console.log(this.prod);
    })

  }

  ngOnInit(): void {
    let uName = localStorage.getItem('user_name');
    if (uName){
      this.username = uName;
    }
  }

}
