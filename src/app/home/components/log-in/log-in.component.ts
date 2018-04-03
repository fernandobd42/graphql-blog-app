import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { ReactiveErrorStateMatcherService } from './../../services/reactive-error-state-matcher.service';

import gql from "graphql-tag";
import { Apollo } from "apollo-angular";

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
  loginError

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
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
     const createNewToken = gql`
      mutation createToken(
        $email: String!
        $password: String!
      ) {
        createToken(
            email: $email
            password: $password
        ) {
          token
        }
      }
  `;

  this.apollo
      .mutate({
        mutation: createNewToken,
        variables: {
          email: form.value.email,
          password: form.value.password
        }
      })
      .subscribe(({ data }) => {
        window.sessionStorage.setItem('token', JSON.stringify(data.createToken))
        this.router.navigate(['/auth']);
      },
      
      error => {
        this.loginError = error.message.replace('GraphQL error:', '');
    })
  }

  clear(e) {
    e.preventDefault()
    this.logInForm.reset()
  }
}
