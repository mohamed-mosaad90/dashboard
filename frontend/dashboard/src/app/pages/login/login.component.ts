import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../Components/user-services.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { CookieService } from 'ngx-cookie-service'; 
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  providers: [UserServicesService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: UserServicesService,
    private router: Router,
    private cookiesService:CookieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  async login() {
    const userData = this.userForm.value;
    console.log('Login request data:', userData);
    this.productService.LoginUser(userData).subscribe(
      response => {
        console.log('Login response:', response);
        const token = response.body.message;
        console.log('Token:', token);
        this.cookiesService.set('token', token);


        if (token) {
          const decodedToken: any = jwtDecode(token);
          this.authService.setAuthenticated(true);
          this.authService.setUserRole(decodedToken.role);
          console.log('Decoded Token:', decodedToken);
          if (decodedToken.role === 'Admin') {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/home']);
          }
          alert("You logged in successfully");
        } else {
          console.error("Token not found in response body");
          alert("Token not found. Please try again.");
        }
      },
      error => {
        console.error("Error", error);
        alert("An error occurred. Please try again.");
      }
    );
  }}