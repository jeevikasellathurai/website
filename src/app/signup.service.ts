import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from './signup';
import { Observable } from 'rxjs';
import { Order } from './order';
import { Form } from './form';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }
  baseUrl="http://localhost:8080"

  post(signup:Signup){
    return this.http.post<Signup>(`${this.baseUrl}/save`,signup)
  }
  
  // login(name: string, password: string): Observable<any> {
  //   const loginData = { name, password };
  //   return this.http.post(`${this.baseUrl}/login`, loginData);
  // }
  login(loginData:Login): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/login`, loginData);
  }
  getProduct():Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}/getall`);
  }
  postForm(form:Form){
    return this.http.post<Form>(`${this.baseUrl}/formdetails`,form)
  }
}
