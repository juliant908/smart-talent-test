import { Component, inject } from '@angular/core';
import { products } from '../../utils/store';
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
  items = this.storeService.storeItems();

  user = this.loginService.currentUser$.value;

  addItem() {
    this.storeService.editMode.set(false);
    this.router.navigate(['/admin']);
  }
}
