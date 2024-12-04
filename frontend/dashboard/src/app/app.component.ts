import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AllProductsComponent } from './Components/all-products/all-products.component';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './Components/update/update.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';
import { TheMainComponent } from './Components/the-main/the-main.component';
import { ThirdPageComponent } from './pages/third-page/third-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    FormsModule,
    HttpClientModule
    ,AddProductComponent,
    AllProductsComponent,
    CommonModule,
    ProductDetailsComponent
    ,UpdateComponent,
    SignUpComponent,
    LoginComponent
    ,DashboardComponent
    ,HomeComponent,
    TheMainComponent,
    ThirdPageComponent
  ],
    providers: [
      
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';
}
