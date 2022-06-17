import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { account } from 'src/app/schemas/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  accounts : any=[];
  username !: string;
  email !: string;
  password !: string;
  cpassword !: string;
  response : any;
  fullResponse: any;
  account !: account;
  color1 : string="red";

  constructor(private authService: AuthService) { }

  matchPasswords(){
    if (this.password != this.cpassword){
      this.response = "Passwords do not match!";
      //console.log(this.response);
    }else{
      //console.log("Passwords are correct.");
      //this.response = "Passwords are correct.";
      this.registerAccount();
    }
  }

  registerAccount(){
    const newAccount = {
      username: this.username,
      email: this.email,
      password: this.password
    }

    this.authService.registerAccount(newAccount)
    .subscribe(account => {
      this.accounts.push(account);
      this.fullResponse = account;
      //console.log(this.fullResponse.status);

      if (this.fullResponse.status == 201){
        this.color1 = "green";
        this.response = "Success!";
        //console.log("success");
      }
    }, (error)=>{
      this.fullResponse = error;
      //console.log(this.fullResponse.status);
      if (this.fullResponse.status == 409){
        //console.log("relax a bit");
        this.response = "Username arleady taken or an account with that email arleady exists!";
      }else if(this.fullResponse.status == 500){
        this.response = "Oops! Try again later.";
        //console.log("server error");
      }
    }
    )
  }

  ngOnInit(): void {
  }

}
