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
import { NgChartsModule } from 'ng2-charts';

import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgChartsModule,ProductDetailsComponent,FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
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
  userName: any;

  toggleMenu() {
    this.isMenuToggled = !this.isMenuToggled;
  }
  
  constructor(private cookies: CookieService ) { 

    this.token=cookies.get("token");}


    token:any;
  public chart: any;

  ngOnInit(): void {
    this.createChart();
    this.token = this.cookies.get("token");
    const decodedToken: any = jwtDecode(this.token);
    this.userName = decodedToken.name;
  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2024-02-10', '2024-02-11', '2024-02-12','2024-02-13',
                                 '2024-02-14', '2024-02-15', '2024-02-16','2024-02-17', ], 
           datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
                                 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
                                     '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

}

