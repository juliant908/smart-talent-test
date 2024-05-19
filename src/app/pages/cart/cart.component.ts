import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartService = inject(CartService);

  cart!: Observable<CartItem[] | []>;
  total = this.cartService.total$;

  ngOnInit(){
    this.cart = this.cartService.cart$;

    // this.cart = EMPTY;
    console.log(this.cart);
  }

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  checkout(){
    let cart;
    this.cartService.cart$.subscribe(
      data => cart = data,
      err => console.log(err)
    );
    if(!cart) return
    this.cartService.checkout(cart);
  }
}
