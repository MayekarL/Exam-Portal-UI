import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  //Fetching Questions Of Quiz 
  public getQuestionsofQuiz(qId:any){
    return this.http.get(`${baseUrl}/question/${qId}`);
  }

 public getQuestionsofQuizForTest(qId:any){
    return this.http.get(`${baseUrl}/question/${qId}`);
  }

  //Adding new Questions 
  public addQuestions(question:any){
    return this.http.post(`${baseUrl}/question/create`,question);
  }

  //Delete Question
  public deleteQuestion(qId:number){
    return this.http.delete(`${baseUrl}/question/delete/${qId}`);
  }

  public calculateMarks(questionList:any){
    return this.http.post(`${baseUrl}/question/calculate-marks`,questionList);
  }
}
