import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
//import { Observable, throwError } from 'rxjs';
//import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

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
