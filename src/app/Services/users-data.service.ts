import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Register } from '../Interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor() { }

  private usersData = new BehaviorSubject<Register[]>([]);

  public users = this.usersData.asObservable();

  addUser(user: Register){
    const usersTemp = this.usersData.getValue();
    this.usersData.next([...usersTemp, user])
  }

  deleteUser(id: number){
    const usersTemp = this.usersData.getValue().slice(id, 1);
    this.usersData.next([...usersTemp])
  }
}
