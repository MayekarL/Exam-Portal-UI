import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  //Fetch all the Quizzes 
  public getAllQuizzes() {
    return this.http.get(`${baseUrl}/quiz/get`);
  }

  //Creating Quiz
  public createQuiz(quiz: any) {
    return this.http.post(`${baseUrl}/quiz/create`, quiz);
  }

  //Delete Quiz 
  public deleteQuiz(qId: number) {
    return this.http.delete(`${baseUrl}/quiz/delete/${qId}`);
  }

  //GetQuiz 
  public getQuiz(qId: any) {
    console.log(qId);
    return this.http.get(`${baseUrl}/quiz/get/${qId}`);
  }

  //Update Quiz
  public updateQuiz(quiz: any) {
    return this.http.put(`${baseUrl}/quiz/update`, quiz);
  }

  //GetQuizByCategories
  public getQuizByCategory(catId: number) {
    return this.http.get(`${baseUrl}/quiz/catgeories/${catId}`);
  }

  //Get Active Quiz By Category 
  public activeQuizzes() {
    return this.http.get(`${baseUrl}/quiz/get/active`);
  }

  //Get Active Quiz By Category 
  public activeQuizOfCategories(cId:number) {
    return this.http.get(`${baseUrl}/quiz/active/catgeories/${cId}`);
  }

}
