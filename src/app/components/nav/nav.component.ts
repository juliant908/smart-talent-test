import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  loginService = inject(LoginService);
  user!: BehaviorSubject<User | null>;

  ngOnInit() {
    this.user = this.loginService.user$;
  }

  logout() {
    this.loginService.logout();
  }
}
