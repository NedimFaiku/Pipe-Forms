import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { LoginService } from '../Services/login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(private loginService: LoginService, private router: Router){};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    if (this.loginService.islogin){
      if(this.loginService.role === 'admin')
        return true
      this.router.navigate(['profile']);
      return false
    } else {
      this.router.navigate(['login']);
      return false
    }
  }
}