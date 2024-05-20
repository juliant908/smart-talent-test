import { Injectable, signal } from '@angular/core';
import { products } from '../utils/store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  editMode = signal(false)
  storeItems = signal<Product[]>([])
  item$ = new BehaviorSubject<Product | null>(null)

  fetchProducts() {
    this.storeItems.set(products)
  }

  setItem(product: Product) {
    this.item$.next(product)
  }

  saveItem(product: Product) {
    const items = this.storeItems()
    const index = items.findIndex(i => i.id === product.id)
    items[index] = product
    this.storeItems.set(items)
    this.fetchProducts()
  }

  addItem(product: Product) {
    this.storeItems.update((items: Product[]) => items.concat(product))
  }

  deleteItem(product: Product) {
    this.storeItems.update((items: Product[]) => items.filter(i => i.id !== product.id))
  }
}
