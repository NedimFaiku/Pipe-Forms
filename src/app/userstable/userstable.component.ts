import { Component } from '@angular/core';
import { UsersDataService } from '../Services/users-data.service';
import { Register } from '../Interfaces/register';

@Component({
  selector: 'app-userstable',
  templateUrl: './userstable.component.html',
  styleUrls: ['./userstable.component.css'],
})
export class UserstableComponent {
  usersData: Register[] = [];
  constructor(private userDataService: UsersDataService) {
    this.userDataService.users.subscribe((users) => {
      this.usersData = users;
    });
  }

  deleteUser(id: number) {
    this.userDataService.deleteUser(id);
  }
}
