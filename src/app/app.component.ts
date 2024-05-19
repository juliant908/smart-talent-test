import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { StoreService } from './services/store.service';
import { interval } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smart-talent-test';
  loginService = inject(LoginService);
  storeService = inject(StoreService);

  ngOnInit(){
    this.loginService.loadUsers();
    this.storeService.fetchProducts();
  }
}
