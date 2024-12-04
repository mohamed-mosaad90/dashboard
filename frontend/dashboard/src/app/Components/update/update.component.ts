import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServicesService } from '../user-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'; 


@Component({
  selector: 'app-update',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  providers:[UserServicesService ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent  implements OnInit {
    product: any = {};
    token:any;
  
    constructor(private route: ActivatedRoute, private userService: UserServicesService ,private cookies: CookieService ) { 

      this.token=cookies.get("token");}
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const productId = params.get('id');
        console.log(productId); 
        if (productId) {
          this.userService.GetProductByID(productId,this.token).subscribe((data: any) => {
            this.product = data;
          });
        } 
      });
    }
  
    onSubmit(form: any) {
      if (form.valid) {
        this.userService.UpdateUser(this.product._id, this.product,this.token).subscribe(() => {
          alert("User updated successfully");
        });
      }
    }
  
  
  }