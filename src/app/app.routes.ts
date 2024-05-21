import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './shared/auth.guard';
import { ShopComponent } from './pages/shop/shop.component';
import { NotFoundComponent } from './pages/404/404.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/shop',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop.component').then(m => m.ShopComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent),
    canActivate: [authGuard]
  },
  {
    path: 'test',
    component: ShopComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];
