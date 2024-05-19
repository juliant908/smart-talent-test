import { Component, Input, inject } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  loginService = inject(LoginService);
  storeService = inject(StoreService);
  cartService = inject(CartService);
  router = inject(Router);
  user: User | null = this.loginService.currentUser$.value;;
  @Input({ required: true }) item!: Product;

  editItem(item: Product) {
    this.storeService.setItem(item);
    this.storeService.editMode.set(true);
    this.router.navigate(['/admin']);
  }

  addToCart(item: Product) {
    item.quantity--;
    this.cartService.addToCart(item);
  }
}
