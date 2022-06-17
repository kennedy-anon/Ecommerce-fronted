import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { loginCredentials } from 'src/app/schemas/loginCredentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  username !: string;
  password !: string;
  color1 : string="red";
  response : any;
  logins: any;
  fResponse : any;

  constructor(private authService: AuthService) { }

  login(){
    const credentials = {
      username: this.username,
      password: this.password
    }

    this.authService.loginAccount(credentials)
    .subscribe(loginCredentials => {
      this.fResponse = loginCredentials;
      
      if (this.fResponse.status == 200){
        this.response = "Success";
        this.color1 = "green";
      }
      //console.log(this.fResponse);
    }, (error)=>{
      this.fResponse = error;
      if (this.fResponse.status == 401){
        this.response = "Incorrect username or password!";
      }else if(this.fResponse.status == 500){
        this.response = "Oops! Try again later.";
      }
    })
  }

  ngOnInit(): void {
  }

}
