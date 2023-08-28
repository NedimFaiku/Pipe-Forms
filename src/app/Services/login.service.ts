import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Register } from '../Interfaces/register';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  private userData: BehaviorSubject<Register | null> = new BehaviorSubject<Register | null>(null);

  islogin = false;
  role = 'user';
  public user = this.userData.asObservable();

  updateIsLogin(param: boolean) {
    this.islogin = param;
  }

  updateRole(param: string): void {
    this.role = param;
  }

  updateUser(user: Register){
    this.userData.next(user);
  }

  logOut(){
    this.userData.next(null);
    this.islogin = false;
  }
}


