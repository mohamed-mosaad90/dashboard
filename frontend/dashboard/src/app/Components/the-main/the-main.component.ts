import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllProductsComponent } from '../all-products/all-products.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-the-main',
  standalone: true,
  imports: [RouterModule,ProductDetailsComponent],
  templateUrl: './the-main.component.html',
  styleUrl: './the-main.component.css'
})
export class TheMainComponent {
  value:any=false;
   toggle:any=()=>{
    this.value=!this.value;
      
   }
  
  

}
