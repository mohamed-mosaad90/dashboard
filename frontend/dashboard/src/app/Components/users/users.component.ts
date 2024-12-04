import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserServicesService } from '../user-services.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CookieService } from 'ngx-cookie-service'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGaugeHigh,
  faTableCellsLarge,
  faListCheck,
  faPerson,
  faSearch,
  faBars
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HttpClientModule, RouterModule,ProductDetailsComponent,FontAwesomeModule],
  providers: [UserServicesService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  faSearch = faSearch;
  faBars=faBars
  constructor(private uService: UserServicesService ,private cookies: CookieService ) { 

    this.token=cookies.get("token");}
  Users: any;
  token:any;
  userCount: number = 0;
  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.uService.GetAllUsers(this.token).subscribe({
      next: (data: any) => {
        this.Users = data as any[];
        this.userCount = this.Users.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  makeAdmin(user: any) {
    const confirmation = confirm(
      `Are you sure you want to make ${user.name} an admin?`
    );
    if (confirmation) {
      this.uService.makeUserAdmin(user._id,this.token).subscribe({
        next: (response) => {
          console.log('User role updated successfully');
          alert(`User ${user.name} is now an admin.`);
          this.getAllUsers();
        },
        error: (err) => {
          console.error('Error updating user role:', err);
        },
      });
    } else {
      alert('User admin role update canceled.');
    }
  }
  deactivateUser(user: any) {
    const deactivateConfirm = confirm(
      `Are you sure to deactivate ${user.name} ?`
    );
    if (deactivateConfirm) {
      this.uService.deactivateUser(user._id,this.token).subscribe({
        next: (response) => {
          console.log('User deactivated successfully');
          alert(`User ${user.name} deactivated.`);
          this.getAllUsers();
        },
        error: (err) => {
          console.error('Error deactivating user:', err);
        },
      });
    } else {
      alert('deactivating user operation is canceled.');
    }
  }
  deleteUser(user: any) {
    const deleteConfirm = confirm(`Are you sure to delete ${user.name}?`);
    if (deleteConfirm) {
      this.uService.deleteUser(user._id,this.token).subscribe({
        next: (response) => {
          console.log('User deleted successfully');
          alert(`User ${user.name} deleted successfully .`);
          this.getAllUsers();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        },
      });
    } else {
      alert('Deleting user operation is canceled.');
    }
  }
}
