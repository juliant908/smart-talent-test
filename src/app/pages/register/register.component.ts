import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  loginService = inject(LoginService)

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });

  registerUser() {
    this.loginService.registerUser({
      id: Date.now(),
      name: this.registerForm?.value.name ?? '',
      email: this.registerForm?.value.email ?? '',
      password: this.registerForm?.value.password ?? '',
      admin: false
    })
  }

  ngOnDestroy() {
    this.registerForm.reset();
    this.loginService.emailExists = false;
  }
}
