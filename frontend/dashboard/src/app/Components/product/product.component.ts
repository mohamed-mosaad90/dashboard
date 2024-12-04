import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserServicesService } from '../user-services.service';
import { CookieService } from 'ngx-cookie-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTrash,
  faPenToSquare,
    faBars
  } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule,HttpClientModule,FormsModule,CommonModule ,FontAwesomeModule],
  providers:[UserServicesService ],

  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  product: any = {};
    token:any;
  constructor( private userService: UserServicesService,private cookies: CookieService  ){
    this.token=cookies.get("token");}
  @Input() oneProduct:any;
  faPenToSquare=faPenToSquare
  faTrash=faTrash;

  onDelete() {
    this.userService.DeleteProduct(this.oneProduct._id,this.token).subscribe(() => {
      alert("User deleted successfully");
    });
  }



}
