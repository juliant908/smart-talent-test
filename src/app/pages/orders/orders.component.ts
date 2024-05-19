import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders = [] as any[]

  ngOnInit() {
    this.orders = this.getOrders()
  }

  getOrders() {
    return localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders') ?? '') : []
  }
}
