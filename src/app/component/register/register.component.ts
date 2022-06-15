import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username !: string;
  email !: string;
  password !: string;
  cpassword !: string;
  response : any;

  constructor() { }

  matchPasswords(){
    if (this.password != this.cpassword){
      this.response = "Passwords do not match!";
      console.log(this.response);
    }else{
      console.log("Passwords are correct.");
    }
  }

  ngOnInit(): void {
  }

}
