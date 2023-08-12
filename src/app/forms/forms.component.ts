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

  constructor(private userDataService: UsersDataService) {
    this.userDataService.users.subscribe((res) => {
      this.userData = res;
    });
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup(
      {
        personalDetails: new FormGroup({
          firstname: new FormControl(null),
          lastname: new FormControl(null),
          username: new FormControl(null, [Validators.required]),
          email: new FormControl(null, [Validators.required, Validators.email]),
          password: new FormControl(null, [
            Validators.required,
            Validators.minLength(8),
          ]),
          passwordConfirm: new FormControl(null, Validators.required),
          creditCard: new FormControl(null, [
            Validators.required,
            Validators.maxLength(16),
            Validators.minLength(16),
          ]),
        }),
        jobPosition: new FormControl(null, Validators.required),
      },
      {
        validators: [
          this.usernameValidator,
          this.emailValidator,
          this.passwordConfirmValidator,
        ],
      }
    );
  }

  usernameValidator = (control: AbstractControl): ValidationErrors | null => {
    let usernames = this.userData.map((e) => e.username);
    if (usernames.includes(control.value.personalDetails.username)) {
      return {
        usernameNotAvailable: true,
        message: 'This user already exists!!!',
      };
    }
    return null; // Validation passed
  };

  emailValidator = (control: AbstractControl): ValidationErrors | null => {
    let emails = this.userData.map((e) => e.email);
    if (emails.includes(control.value.personalDetails.email)) {
      return {
        emailNotAvailable: true,
        message: 'This email already exists!!!',
      };
    }
    return null; // Validation passed
  };

  passwordConfirmValidator = (control: AbstractControl): ValidationErrors | null => {
    let password = control.value.personalDetails.password;
    if (password != control.value.personalDetails.passwordConfirm) {
      return {
        passwordNotMatching: true,
        message: 'This password does not match!!!',
      };
    }
    return null; // Validation passed
  };

  onSubmit() {
    const newUser: Register = {
      id: this.id,
      username: this.reactiveForm.value.personalDetails.username,
      email: this.reactiveForm.value.personalDetails.email,
      password: this.reactiveForm.value.personalDetails.password,
      jobposition: this.reactiveForm.value.jobPosition,
      creditCard: this.reactiveForm.value.personalDetails.creditCard,
    };
    this.id++;
    this.userDataService.addUser(newUser);
    this.reactiveForm.reset();
  }
}
