import { Component } from '@angular/core';
import { UserServicesService } from '../user-services.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service'; 

import {

  faSearch,
  faBars,

} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,FormsModule,CommonModule,FontAwesomeModule],
  providers: [UserServicesService],

  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  faSearch=faSearch
  faBars=faBars
  toggleMenu(){
    
  }
  product = { name: '', price: '', category: '', file: '' ,Description:''};
  
    constructor(private productService: UserServicesService ,private cookies: CookieService ) { 

      this.token=cookies.get("token");}
  

      token:any;
    onSubmit() {
      const formData = new FormData();
      formData.append('name', this.product.name);
      formData.append('price', this.product.price);
      formData.append('category', this.product.category);
      formData.append('Description', this.product.Description);
      formData.append('file', this.product.file);

  
      this.productService.addproduct(formData,this.token).subscribe(
        response => {
          console.log('Product added successfully:', response);
          this.product = { name: '', price: '', category: '', file: '',Description:'' };
        },
        error => {
          console.error('Error adding product:', error);
        }
      );
    }
  
    onFileSelected(event:any) {
      this.product.file = event.target.files[0];
    }
  
    isFormValid() {
      return this.product.name && this.product.price && this.product.category && this.product.file;
    }
  }