import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isEmailValid: boolean = true;
  isPasswordValid: boolean = true;

  constructor(private router: Router) {}


  validateEmail(email: string): boolean {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    // Password validation: At least 6 characters, combination of letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  }

  isFormValid(): boolean {
    return this.validateEmail(this.email) && this.validatePassword(this.password);
  }

  handleEmailChange(event: any): void {
    this.email = event.target.value;
    this.isEmailValid = this.validateEmail(this.email);
  }

  handlePasswordChange(event: any): void {
    this.password = event.target.value;
    this.isPasswordValid = this.validatePassword(this.password);
  }

  handleForgotPasswordClick(event: Event): void {
    event.preventDefault();
    console.log('Forgot password clicked!');
  }

  handleLogin(): void {
    if (this.isFormValid()) {
      this.router.navigate(['/home']);
    }
  }
}
