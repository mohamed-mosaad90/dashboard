import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  constructor(private http: HttpClient) {}

  addproduct(productData: FormData,token:any) {
    return this.http.post('http://localhost:3000/addproduct', productData,{headers:{'x-auth-token': token }});
  }

  GetProductByID(id: any,token:any) {
    return this.http.get(`http://localhost:3000/product/${id}`,{headers:{'x-auth-token': token }});
  }

  DeleteProduct(id: any,token:any) {
    return this.http.delete(`http://localhost:3000/product/${id}`,{headers:{'x-auth-token': token }});
  }

  UpdateUser(id: any, userData: any,token:any) {
    return this.http.patch(`http://localhost:3000/product/${id}`, userData,{headers:{'x-auth-token': token }});
  }
  SignupUser(userData: any): Observable<any> {
    return this.http.post(`http://localhost:3000/signup`, userData);
  }
  LoginUser(userData: any): Observable<any> {
    return this.http.post(`http://localhost:3000/login`, userData,{ observe: 'response' });
  }
  GetAllUsers(token:any) {
    return this.http.get(`http://localhost:3000/getallusers`,{headers:{'x-auth-token': token }});
  }
  makeUserAdmin(userId: string,token:any) {
    const url = `http://localhost:3000/user/${userId}/role`;
    return this.http.patch(url, {headers:{'x-auth-token': token }});
  }
  deactivateUser(userId: string,token:any) {
    const url = `http://localhost:3000/user/${userId}`;
    return this.http.patch(url, {headers:{'x-auth-token': token }});
  }
  deleteUser(userId:string,token:any) {
    const url = `http://localhost:3000/user/${userId}`;
    return this.http.delete(url,{headers:{'x-auth-token': token }});
  }

  getAllProducts(token:any) {
    return this.http.get<any[]>('http://localhost:3000/products',{headers:{'x-auth-token': token }});
  }


  getUserRole(token: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/user/role', { headers: { 'x-auth-token': token } });
  }

}
