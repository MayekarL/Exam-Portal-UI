import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //get Current User 
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token 
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  public loginUser(token: any) {
    localStorage.setItem("token", token);
    return true;
  }


  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    return (tokenStr == undefined || tokenStr == '' || tokenStr == null) ? false : true;
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  public getToken(){
    return localStorage.getItem("token");
  }

  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
    return true
  }

  public getUser(){
    let userStr =localStorage.getItem("user");
     if(userStr != null){
       return JSON.parse(userStr);
     }else{
       return null;
     }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.roleName;
  }
}
