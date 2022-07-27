import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { of } from 'rxjs/internal/observable/of';
//import { BehaviorSubject, Subject } from 'rxjs';
//import * as jwt_decode from "jwt-decode";
//import { Observable, throwError } from 'rxjs';
//import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper :JwtHelperService) {}

  /*decode access token
  isLoggedIn(){
    const token = localStorage.getItem('access_token');
    const payload = atob(token?.split('.')[1]);
    const parsedPayload = JSON.parse(payload);

    return parsedPayload.exp > Date.now()
  }*/
  

  //decode access token
  decodeToken(token: string | null){
    if (token){
      console.log(this.jwtHelper.decodeToken(token).isAdmin);
    }

  }

  //Check if token has expired
  isExpired(): boolean{
    const token = localStorage.getItem('access_token');
    if (token){
      return this.jwtHelper.isTokenExpired(token);
    }else{
      return false;
    }
  }

    //for guarding routes...check if admin
    isAdmin(): boolean{
      let token = localStorage.getItem('access_token');
      if (token){
        return this.jwtHelper.decodeToken(token).isAdmin;
      }else{
        return false;
      }
    }

    //logout
    logOut(){
      localStorage.removeItem('access_token');
    }

  //register new account
  registerAccount(newAccount: any){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/api/auth/register', newAccount, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }

  //login service
  loginAccount(credentials: any){
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:5000/api/auth/login', credentials, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }
  
}
