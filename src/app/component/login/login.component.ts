import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private route: Router) { }

  login(){
    const credentials = {
      username: this.username,
      password: this.password
    }

    this.authService.loginAccount(credentials)
    .subscribe(loginCredentials => {
      this.fResponse = loginCredentials;
      localStorage.setItem('access_token', this.fResponse.body.accessToken);
      localStorage.setItem('user_name', this.fResponse.body.username);

      //console.log(this.fResponse.body.accessToken);

      //Checking access priviledges
      if ((this.fResponse.status == 200) && (this.fResponse.body.isAdmin)) {
        //console.log("Admin access granted");
        this.response = "Success";
        this.color1 = "green";
        this.route.navigate(['/admin']);

      }else if ((this.fResponse.status == 200) && (this.fResponse.body.isAdmin == false)){
        console.log("Granted access with no admin priviledges");
        this.response = "Success";
        this.color1 = "green";
      }

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
