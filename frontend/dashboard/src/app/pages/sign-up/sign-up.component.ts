import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../Components/user-services.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Console } from 'console';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,FormsModule,CommonModule,RouterModule],
  providers: [UserServicesService],

  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent  {
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private userService: UserServicesService,
    private router: Router
  ) { }

  get isNameValid() {
    return this.userForm.controls['name'].valid;
  }

  get isEmailValid() {
    return this.userForm.controls['email'].valid;
  }

  get isPasswordValid() {
    return this.userForm.controls['password'].valid;
  }

  onsign() {
    this.userService.SignupUser(this.userForm.value).subscribe(
      response => {
        console.log("User is signed up successfully:", response);
      },
      error => {
        console.error("Error occurred during sign up:", error);
      }
    );
    this.router.navigate(['/login']);

  }


}