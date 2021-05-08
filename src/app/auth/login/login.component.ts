import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../services/_auth/auth.service';
import {AbstractControl, EmailValidator, Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router)
  {
    this.loginForm = new FormGroup({
      email: new FormControl('employee@homeweb.com', [Validators.required, Validators.email]),
      password: new FormControl('12345678', [Validators.required], )
    });
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(res => {
        this.router.navigate(['dashboard']);
      });
    }
  }

  get email(): AbstractControl { return this.loginForm.get('email'); }

  get password(): AbstractControl { return this.loginForm.get('password'); }

}
