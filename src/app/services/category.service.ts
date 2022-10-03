import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  //Fetching all categories from Server 
  public categories(){
    return this.http.get(`${baseUrl}/category/get`);
  }

   //Fetching all active categories from Server 
   public activeCategories(){
    return this.http.get(`${baseUrl}/get/active`);
  }
  //Creating Catgeory 

  public createCategory(category:any){
    return this.http.post(`${baseUrl}/category/create`,category);
  }
}
