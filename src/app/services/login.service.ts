import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { users } from '../utils/users';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userExists = true;
  emailExists = false;
  user$ = new BehaviorSubject<User | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null);
  users = signal<User[]>([])
  router = inject(Router);
  constructor() {}

  loadUsers() {
    this.users.set(users)
  }

  checkUser(credentials: Credentials) {
    const user = this.users().find(u => u.email === credentials.email && u.password === credentials.password)
    if(user) {
      localStorage.setItem('user', JSON.stringify(user))
      this.user$.next(user)
    }
    return user
  }

  login(credentials: Credentials) {
    this.userExists = false;
    this.loadUsers();
    const userExists = this.checkUser(credentials)
    if(userExists){
      this.userExists = true;
      this.router.navigate(['/shop']);
    } else {
      this.userExists = false;
    }
  }

  registerUser(user: User) {
    if(this.checkEmail(user.email)) return this.emailExists = true;
    else return this.users.set([...this.users(), user])
  }

  checkEmail(email: string) {
    return this.users().find(u => u.email === email)
  }

  logout() {
    localStorage.removeItem('user');
    this.user$.next(null);
    this.router.navigate(['/login']);
  }
}
