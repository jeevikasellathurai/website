import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Form } from '../form';
import { Login } from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public loginForm:FormGroup
constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router,private signupservice:SignupService){}
logins:Login=new Login();
  ngOnInit(): void {
this.loginForm=this.formbuilder.group({
  name:['',[Validators.required]],
  password:['',[Validators.required]]
})
  }

login() {
  // if (this.loginForm.valid) {
  //   const name = this.loginForm.value.name;
  //   const password = this.loginForm.value.password;

    this.signupservice.login(this.logins).subscribe(
      (res) => {
        console.log(res);
        alert("Login Successfull")
        localStorage.setItem('user',JSON.stringify(res));
        this.router.navigate(["/products"])
      },
      (err) => {
        console.log('Login failed!');
        alert("Login failed. Please check your credentials.");
      }
    );
  }
}





