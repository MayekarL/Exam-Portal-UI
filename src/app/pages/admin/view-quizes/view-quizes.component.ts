import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {

  public quizzes: any = [];

  public quiz:any = {
    qId:0
  }

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe(
      (data: any) => {
        this.quizzes = data.quizDtos;
      }, (error) => {

      },
    )



  }

  deleteQuiz(qId: any) {

    Swal.fire({
      icon: 'question',
      title: 'Are you Sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
     
        this.quizService.deleteQuiz(qId).subscribe(
          (data) => {
            Swal.fire("Success", "SuccessFully Deleted", "success");
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId != qId);
          }, (error) => {
            Swal.fire("Error", "Something Went Wrong !", "error");
          }
        )
      }
    })

  }


}


