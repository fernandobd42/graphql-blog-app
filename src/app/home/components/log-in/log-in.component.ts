import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { ReactiveErrorStateMatcherService } from './../../services/reactive-error-state-matcher.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  logInForm
  matcher
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
    this.logInForm = this.fb.group({
      email: this.emailFormControl,
      password: this.passwordFormControl
    })
  }

  save(form) {
    console.log(form);
  }

  clear(e) {
    e.preventDefault()
    this.logInForm.reset()
  }
}
