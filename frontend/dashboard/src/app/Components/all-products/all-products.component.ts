import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../user-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductComponent } from '../product/product.component';
import { RouterModule } from '@angular/router';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CookieService } from 'ngx-cookie-service'; 




@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule,FormsModule,ProductComponent,RouterModule,ProductDetailsComponent],
  providers: [UserServicesService],

  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {
  
    constructor(private productService: UserServicesService ,private cookies: CookieService ) { 

this.token=cookies.get("token");}
      products: any[] = [];
      token:any;

    ngOnInit() {  

      console.log("this my token ",this.token);

    this.productService.getAllProducts(this.token).subscribe(

      
      {
    

    next:(data)=>{

      
      
      console.log(data)
      this.products=data;
    }
  });

  }

}
