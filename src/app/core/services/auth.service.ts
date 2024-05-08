// src/app/services/authentication.service.ts
import axios from 'axios';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'https://gestionrh-0d9m.onrender.com/api/v1/auth';  // Adjust this URL to your backend

  constructor(private router: Router,private activatedRoute: ActivatedRoute) {}


  registerUser(email: string, password: string): Promise<any> {
    return axios.post(`${this.baseUrl}/register`, { email, password })
      .then(response => response.data)
      .catch(this.handleError);
  }


// AuthenticationService
loginUser(email: string, password: string): Promise<any> {
  console.log("email",email);
  console.log("password",password);
  return axios.post(`${this.baseUrl}/login`, { email, password })
    .then(response => {
      sessionStorage.setItem('authUser', JSON.stringify(response.data));
      this.router.navigate(['/dashboard'], { relativeTo: this.activatedRoute });
      return response.data;
    })
    .catch(error => {
      console.error('Login failed:', error.response || error.message || error);
      throw error;  // Rethrow the error so it can be caught in the component
    });
}


  forgetPassword(email: string): Promise<any> {
    return axios.post(`${this.baseUrl}/forget-password`, { email })
      .then(response => response.data)
      .catch(this.handleError);
  }

  logout(): void{

        sessionStorage.removeItem('authUser');
        console.log("authUser", sessionStorage.removeItem('authUser'));
        this.router.navigate(['/account/login'], { relativeTo: this.activatedRoute });

  }

  getAuthenticatedUser(): any {
    const user = sessionStorage.getItem('authUser');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getAuthenticatedUser() !== null;
  }


  private handleError(error: any): Promise<never> {
    console.error('An error occurred:', error.response || error.message || error);
    return Promise.reject(error.response?.data?.message || error.message || "An unknown error occurred");
  }
}
