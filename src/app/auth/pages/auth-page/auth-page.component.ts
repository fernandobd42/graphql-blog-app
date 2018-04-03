import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import gql from "graphql-tag";
import { Apollo } from "apollo-angular";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  users
  constructor(
    private authService: AuthService,
    private router: Router,
    private apollo: Apollo
  ) { 
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  displayUsers() {
    const getUsers = gql`
      {
        users {
          id
          name
          email
        }
      }
    `;

    this.apollo
    .watchQuery({
      query: getUsers,
      fetchPolicy: "network-only"
    })
    .valueChanges
    .subscribe(users => {
      console.log(users.data['users'])
      this.users = users.data['users'];
    });
    
  }

  ngOnInit() {
    this.displayUsers()
  }

}
