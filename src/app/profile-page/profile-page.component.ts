import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersDataService } from '../Services/users-data.service';
import { Register } from '../Interfaces/register';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  id!: string;
  currentUser!: Register;
  userForm: FormGroup = new FormGroup({});
  constructor(
    private param: ActivatedRoute,
    private usersDataService: UsersDataService
  ) {
    param.paramMap.subscribe((res) => {
      this.id = res.get('userId')!;
    });

    this.usersDataService.users.subscribe((res) => {
      this.currentUser = res.find((e) => e.id === parseInt(this.id))!;
    });
  }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl(this.currentUser.username, [
        Validators.required,
      ]),
      email: new FormControl(this.currentUser.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.currentUser.password, [
        Validators.required,
        Validators.minLength(8),
      ]),
      creditCard: new FormControl(this.currentUser.creditCard, [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(16),
      ]),
      jobPosition: new FormControl(this.currentUser.jobposition, Validators.required),
      role: new FormControl(this.currentUser.role, Validators.required),
    });
  }
}
