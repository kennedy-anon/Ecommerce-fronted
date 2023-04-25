import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'http://localhost:5000/'

  constructor(private http: HttpClient, private jwtHelper :JwtHelperService) {}

  //Check if token has expired
  isExpired(): boolean{
    const token = localStorage.getItem('access_token');
    if (token){
      return this.jwtHelper.isTokenExpired(token);
    }else{
      return true;
    }
  }

  //return true if token is still valid(not expired)
  isNotExpired(): boolean{
    return !this.isExpired();
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
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_id');
    }

  //register new account
  registerAccount(newAccount: any){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}api/auth/register`, newAccount, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }

  //login service
  loginAccount(credentials: any){
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.apiUrl}api/auth/login`, credentials, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }
  
}
