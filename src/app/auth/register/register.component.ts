import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
        name: ['Ivan', [Validators.required, Validators.minLength(4)]],
        email: ['ivan@ivan.com', [Validators.required, Validators.email]],
        password: ['12345678', [Validators.required]],
        phone: ['554234234', [Validators.required, Validators.minLength(9)]],
        address: ['ST Barbara', [Validators.required, Validators.maxLength(255)]],
        fiscal_id: ['1234567890', [Validators.required, Validators.maxLength(25)]],
        role: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(res => {
        this.router.navigateByUrl('/login');
        // console.log(res.dataUser);
      });
    }
  }

  get name() { return this.registerForm.get('name'); }

  get email() { return this.registerForm.get('email'); }

  get password() { return this.registerForm.get('password'); }

  get phone() { return this.registerForm.get('phone'); }

  get address() { return this.registerForm.get('address'); }

  get fiscalId() { return this.registerForm.get('fiscal_id'); }

  get role() { return this.registerForm.get('role'); }

}
