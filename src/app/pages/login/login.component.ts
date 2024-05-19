import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);
  loginService = inject(LoginService);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });

  login() {
    const payload = { email: this.loginForm?.value.email ?? '', password: this.loginForm?.value.password ?? '' };
    this.loginService.login(payload);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }


  ngOnDestroy() {
    this.loginForm.reset();
    this.loginService.userExists = true;
  }
}
