import { Component } from '@angular/core';
import axios from 'axios';
import { AuthenticationService } from '../../../../app/core/services/auth.service';

@Component({
  selector: 'app-login-v2',
  templateUrl: './login_v2.component.html',
  styleUrls: ['./login_v2.component.scss'] // Corrected property name to styleUrls
})
// Assume imports and @Component decorator are already provided
export class LoginComponent1 {
  email: string ;
  password: string ;

  constructor(private authService: AuthenticationService) {}

// LoginComponent
async login(): Promise<void> {
  try {
    const user = await this.authService.loginUser(this.email, this.password);
    console.log('Login successful', user);
  } catch (error) {
    console.error('Login failed', error);
    if (error.response && error.response.status === 401) {
      // Handle 401 specifically if needed
      alert('Login failed: Unauthorized. Check your credentials.');
    } else {
      alert('Login failed: An error occurred.');
    }
  }
}
}

