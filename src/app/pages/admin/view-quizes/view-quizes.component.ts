import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {

  public quizzes:any = [];

  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
  this.quizService.getAllQuizzes().subscribe(
    (data: any)=>{
      this.quizzes = data.quizDtos;
      Swal.fire("Success","All Quizzes Loaded Total : "+this.quizzes.length,"success");
    },(error)=>{

    },
  )
  }



}
