import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient) { 
  }

  //Create User 
  public addUser(user:any){
      return this.http.post(`${baseUrl}/user/create`,user);
  }

  //Delete User
  public deleteUser(id:any){
    console.log(id);
    return this.http.delete(`${baseUrl}/user/delete/${id}`);
  }
    
}
