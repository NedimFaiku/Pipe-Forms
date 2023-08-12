import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from '../Interfaces/register';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit{
  error: string = '';
  reactiveForm: FormGroup = new FormGroup({});
  userData: Register[] = [];

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        firstname: new FormControl(null),
        lastname: new FormControl(null),
        username: new FormControl(null, Validators.required),
        email: new FormControl(null,[Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required)
      }),
      jobPosition: new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    
    console.log(this.reactiveForm)
  }
}
