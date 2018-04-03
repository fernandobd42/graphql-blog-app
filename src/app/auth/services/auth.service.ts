import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  public getToken(): string {
    return window.sessionStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }
    return true;
  }
}
