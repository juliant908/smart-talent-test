import { Component, inject, signal } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',

})
export class ShopComponent {
  loginService = inject(LoginService);
  storeService = inject(StoreService);
  router = inject(Router);

  user = this.loginService.user$.value;

  addItem() {
    this.storeService.editMode.set(false);
    this.router.navigate(['/admin']);
  }
}
