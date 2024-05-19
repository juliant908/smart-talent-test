import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cart = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this._cart.asObservable();
  private _total = new BehaviorSubject<number>(0);
  public total$ = this._total.asObservable();
  constructor() {
    this.setTotal()
  }

  addToCart(product: Product) {
    this._cart.pipe(
      map((items: CartItem[]) => {
        const item = items.find(i => i.id === product.id);
        if (item) {
          item.quantity++;
        } else {
          items.push({ ...product, quantity: 1 });
        }
        return items;
      }),
      map(() => this.setTotal()),
      take(1),
    ).subscribe();
  }

  removeFromCart(itemId: number) {
    this._cart.pipe(
      map((items: CartItem[]) => {
        const item = items.find(i => i.id === itemId);
        if (item) {
          item.quantity--;
          if (item?.quantity === 0) {
            return items.filter(i => i.id !== itemId);
          }
        }
        return items;
      }),
      map(() => this.setTotal()),
      take(1),
    ).subscribe();
  }

  setTotal() {
    return this._cart.pipe(
      map((items: CartItem[]) => {
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      }),
    ).subscribe((val) => this._total.next(val));
  }

  checkout(order: CartItem[]) {
    const newOrder = this.cleanOrder(order);
    const totalOrder = {
      id: Date.now(),
      order: newOrder,
      total: this._total.value
    }
    const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localOrders.push(totalOrder);
    localStorage.setItem('orders', JSON.stringify(localOrders));
    this._cart.next([]);
    this._total.next(0);
  }

  cleanOrder(order: CartItem[]){
    return order.filter(item => item.quantity > 0);
  }
}

