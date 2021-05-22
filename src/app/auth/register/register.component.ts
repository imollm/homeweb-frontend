import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/_auth/auth.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.registerForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        phone: ['', [Validators.required, Validators.minLength(9)]],
        address: ['', [Validators.required, Validators.maxLength(255)]],
        fiscal_id: ['', [Validators.required, Validators.maxLength(25)]],
        role: ['customer', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(res => { });
    }
  }

  get name(): AbstractControl { return this.registerForm.get('name'); }

  get email(): AbstractControl { return this.registerForm.get('email'); }

  get password(): AbstractControl { return this.registerForm.get('password'); }

  get phone(): AbstractControl { return this.registerForm.get('phone'); }

  get address(): AbstractControl { return this.registerForm.get('address'); }

  get fiscalId(): AbstractControl { return this.registerForm.get('fiscal_id'); }

  get role(): AbstractControl { return this.registerForm.get('role'); }

}
