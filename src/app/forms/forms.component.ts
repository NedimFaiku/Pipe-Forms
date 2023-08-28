import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Register } from '../Interfaces/register';
import { UsersDataService } from '../Services/users-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  error: string = '';
  reactiveForm: FormGroup = new FormGroup({});
  userData: Register[] = [];
  id: number = 1;
  role: string = '';

  constructor(private userDataService: UsersDataService, private router: Router) {
    this.userDataService.users.subscribe((res) => {
      this.userData = res;
    });
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        firstname: new FormControl(null),
        lastname: new FormControl(null),
        username: new FormControl(null, [
          Validators.required,
          this.usernameValidator,
        ]),
        email: new FormControl(null, [
          Validators.required,
          Validators.email,
          this.emailValidator,
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        passwordConfirm: new FormControl(null, [
          Validators.required,
          this.passwordConfirmValidator,
        ]),
        creditCard: new FormControl(null, [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
          this.creditCardValidator,
        ]),
        gender: new FormControl(null, Validators.required),
      }),
      role: new FormControl(null, Validators.required),
      jobPosition: new FormControl(null, Validators.required),
    });
  }

  usernameValidator = (control: AbstractControl): ValidationErrors | null => {
    let usernames = this.userData.map((e) => e.username);
    if (usernames.includes(control.value)) {
      return {
        usernameNotAvailable: true,
        message: 'This user already exists!!!',
      };
    }
    return null;
  };

  emailValidator = (control: AbstractControl): ValidationErrors | null => {
    let emails = this.userData.map((e) => e.email);
    if (emails.includes(control.value)) {
      return {
        emailNotAvailable: true,
        message: 'This email already exists!!!',
      };
    }
    return null;
  };

  passwordConfirmValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let password = this.reactiveForm.value.personalDetails?.password;
    if (password != control.value) {
      return {
        passwordNotMatching: true,
        message: 'This password does not match!!!',
      };
    }
    return null;
  };

  creditCardValidator = (control: AbstractControl): ValidationErrors | null => {
    let regex = /^[0-9]+$/;
    if (!regex.test(control.value)) {
      return {
        creditCardNotAllowed: true,
        message: 'Your credit card number must contain only numbers!',
      };
    }
    return null;
  };

  setRole(e: Event) {
    this.role = (e.target as HTMLInputElement).value;
    if (this.role === 'admin') {
      this.reactiveForm.controls['jobPosition'].clearValidators();
    } else {
      this.reactiveForm.controls['jobPosition'].setValidators(Validators.required);
    }
    this.reactiveForm.controls['jobPosition'].updateValueAndValidity();
  }

  onSubmit() {
    const newUser: Register = {
      id: this.id,
      username: this.reactiveForm.value.personalDetails.username,
      email: this.reactiveForm.value.personalDetails.email,
      password: this.reactiveForm.value.personalDetails.password,
      role: this.reactiveForm.value.role,
      creditCard: this.reactiveForm.value.personalDetails.creditCard,
    };
    if(newUser.role === 'user'){
      newUser.jobposition = this.reactiveForm.value.jobPosition
    }
    this.id++;
    this.userDataService.addUser(newUser);
    this.reactiveForm.reset();
    this.router.navigate(['login'])
  }
}
