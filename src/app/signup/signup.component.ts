import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from '../signup';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private signupService: SignupService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
    });
  }

  signup() {
    const signup = this.signupForm.value as Signup;
    this.signupService.post(signup).subscribe(
      (res) => {
        alert('Signup Successfulll');
        this.router.navigate(['login']);
        this.signupForm.reset();
      },
      (err) => {
        console.log('Something went wrong');
      }
    );
  }
}
