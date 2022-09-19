import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  //Fetch all the Quizzes 
  public getAllQuizzes(){
    return this.http.get(`${baseUrl}/quiz/get`);
  }

  //Creating Quiz
  public createQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz/create`,quiz);
  }

}
