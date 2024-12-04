import { Routes } from '@angular/router';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AllProductsComponent } from './Components/all-products/all-products.component';
import { UpdateComponent } from './Components/update/update.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { UsersComponent } from './Components/users/users.component';
import { HomeComponent } from './Components/home/home.component';
import { TheMainComponent } from './Components/the-main/the-main.component';
import { ThirdPageComponent } from './pages/third-page/third-page.component';
import { AuthGuard } from './auth.guard';




export const routes: Routes = [

    {path:"",    canActivate: [AuthGuard],


    
    component:TheMainComponent,children:[
        {path:"thedashboard",component:DashboardComponent}, 

        {path:"",redirectTo:"thedashboard",pathMatch:'full'},
        {path:"products",component:AllProductsComponent},
        {path:"users",component:UsersComponent},
        {path:"home",component:HomeComponent},
        {path:"add",component:AddProductComponent},
        {path:"products/update/:id",component:UpdateComponent}

    ]}    ,
    {path:"signup",component:SignUpComponent},
    {path:"login",component:LoginComponent},
    {path:"dashboard",component:ProductDetailsComponent},
  
    {path:"products/update/:id",component:UpdateComponent},

    {path:"userpage",component:ThirdPageComponent},








];

