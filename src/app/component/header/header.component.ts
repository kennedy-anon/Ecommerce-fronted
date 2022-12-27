import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  destroyed = new Subject<void>();
  displaySearch : boolean = false;

  public totalItem : number = 0;

  constructor(private cartService: CartService, private breakpointObserver: BreakpointObserver) { }

  ngOnDestroy(){
    this.destroyed.next();
    this.destroyed.complete();
   }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      //this.totalItem = res.length;
      this.totalItem = this.cartService.getItemCount();
    })

    //mobile responsiveness
    this.breakpointObserver.observe([
      '(min-width: 768px)',
      '(max-width: 768px)'
    ])
    .pipe(takeUntil(this.destroyed))
    .subscribe(() => {
      //desktop
      if(this.breakpointObserver.isMatched('(min-width: 768px)')) {
        this.displaySearch = true;
      }else if(this.breakpointObserver.isMatched('(max-width: 768px)')){
        //mobile
        this.displaySearch = false;
      }
    })
  }

}
