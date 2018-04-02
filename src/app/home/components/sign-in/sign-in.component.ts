import { Component } from '@angular/core';
import {FormControl, Validators, FormBuilder} from '@angular/forms';

import {ReactiveErrorStateMatcherService} from './../../services/reactive-error-state-matcher.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signInForm
  matcher
  nameFormControl
  emailFormControl
  passwordFormControl

  constructor(
    private fb: FormBuilder
  ) 
  {
    this.initialFormControls()
    this.initialForm();
    this.matcher = new ReactiveErrorStateMatcherService();
  }

  initialFormControls() {
    this.nameFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
  }

  initialForm() {
    this.signInForm = this.fb.group({
      name: this.nameFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl
    })
  }

  save(form) {
    console.log(form);
  }

  clear(e) {
    e.preventDefault()
    this.signInForm.reset()
  }
}
