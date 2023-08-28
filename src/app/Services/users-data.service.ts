import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Register } from '../Interfaces/register';
import { Login } from '../Interfaces/login';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private loginService:LoginService) { }

  private usersData = new BehaviorSubject<Register[]>([]);

  public users = this.usersData.asObservable();

  addUser(user: Register){
    const usersTemp = this.usersData.getValue();
    this.usersData.next([...usersTemp, user]);
  }

  deleteUser(id: number){
    const usersTemp = this.usersData.getValue().filter(user => user.id !== id);
    this.usersData.next([...usersTemp]);
  }

  login(user: Login): Login | null{
    let foundUser = this.usersData.getValue().find(e => e.username === user.username && e.password === user.password)
    if(foundUser){
      this.loginService.updateIsLogin(true);
      this.loginService.updateRole(foundUser.role);
      this.loginService.updateUser(foundUser);
      return foundUser
    }
    else{
      return null
    }
  }
}
