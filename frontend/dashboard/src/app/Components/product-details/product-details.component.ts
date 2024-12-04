import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGaugeHigh,
  faTableCellsLarge,
  faListCheck,
  faPerson,
  faSearch,
  faUsers,
  faChartLine,
  faUser,
  faBox,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';

import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AllProductsComponent } from '../all-products/all-products.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgChartsModule,DashboardComponent,RouterModule,AllProductsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  faGaugeHigh = faGaugeHigh;  
  faTableCellsLarge = faTableCellsLarge;
  faListCheck = faListCheck;
  faPerson = faPerson;
  faSearch = faSearch;
  faChartLine = faChartLine;
  faUser = faUser;
  faBox = faBox;
  faUsers = faUsers;
  faBars=faBars
  isMenuToggled: boolean = false;

  toggleMenu() {
    this.isMenuToggled = !this.isMenuToggled;
  }
 

}





