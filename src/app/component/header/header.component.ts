import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  destroyed = new Subject<void>();
  displaySearch : boolean = false;

  public totalItem : number = 0;
  userName !: string | null;

  constructor(private cartService: CartService, private route: Router, private breakpointObserver: BreakpointObserver, private authService: AuthService) { }

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

    //Username to display on profile
    let uName = localStorage.getItem('user_name');
    if (uName){
      this.userName = uName;
    }

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

  logout(){
    this.authService.logOut();
    this.route.navigate(['/products']);
  }

}
