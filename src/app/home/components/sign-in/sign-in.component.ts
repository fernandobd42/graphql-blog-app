import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators, FormBuilder} from '@angular/forms';

import {ReactiveErrorStateMatcherService} from './../../services/reactive-error-state-matcher.service'

import gql from "graphql-tag";
import { Apollo } from "apollo-angular";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signInForm
  matcher
  emailAlreadyUsedError
  nameFormControl
  emailFormControl
  passwordFormControl

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
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
    const createUser = gql`
      mutation createUser(
        $name: String!
        $email: String!
        $password: String!
      ) {
        createUser(
          input: {
            name: $name
            email: $email
            password: $password
          }
        ) {
          id
          name
          email
        }
      }
  `;

  this.apollo
      .mutate({
        mutation: createUser,
        variables: {
          name: form.value.name,
          email: form.value.email,
          password: form.value.password
        }
      })
      .subscribe(({ data }) => {
        console.log(data)
        this.router.navigate(['/home/logIn']);
      },

      error => {
        this.emailAlreadyUsedError = "Email already used, try with another email address."
    })
  
  }

  clear(e) {
    e.preventDefault()
    this.signInForm.reset()
  }
}
