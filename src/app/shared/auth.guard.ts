import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { LoginService } from "../services/login.service";

export const authGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const user = loginService.currentUser$.value === null ? false : true;
  if(!user) {
    inject(Router).navigate(['/login']);
    return false;
  } else {
    return true;
  }
}

