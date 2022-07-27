import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  logout(){
    this.authService.logOut();
    this.route.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
