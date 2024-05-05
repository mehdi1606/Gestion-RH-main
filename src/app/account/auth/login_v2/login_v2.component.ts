import { Component } from '@angular/core';
import axios from 'axios';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-v2',
  
  templateUrl: './login_v2.component.html',
  styleUrls: ['./login_v2.component.scss'] // Corrected property name to styleUrls
})
export  class LoginComponent1 {

  emails: string = '';
  passwords: string = '';

  constructor(private router: Router) {}

  async loginUser() {
    try {
      console.log('Email:', this.emails);
      console.log('Password:', this.passwords);

      const response = await axios.post('http://localhost:8090/api/v1/auth/login', null, {
        params: {
          email: this.emails,
          password: this.passwords
        }
      });
      console.log('Response:', response);
      console.log('Login successful:', response.data);
      alert('Login succeed');
      this.router.navigate(['/dashboard']);

    } catch (error) {
      console.error('Login failed:', error);
    }
  }
}
