import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlDirective,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersDataService } from '../Services/users-data.service';
import { Login } from '../Interfaces/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup = new FormGroup({});
  loginDataValid!: Login | null;

  constructor(private userDataService: UsersDataService, private router: Router) {}
  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.loginDataValid);
    const user: Login = {
      username: this.LoginForm.value.username,
      password: this.LoginForm.value.password,
    };
    this.loginDataValid = this.userDataService.login(user);
    this.router.navigate(['users'])
  }
}
