import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {

  qId: number = 0;
  qTitle: string = "text";

  questionList: any = [];

  //Question Id
  id: number = 0;

  constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qid'];
    this.qTitle = this.route.snapshot.params['title'];

    this.questionService.getQuestionsofQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.questionList = data.questionList;
      }, (error) => {
        Swal.fire("Error", "Something Went Wrong !!", "error");
      }
    )


  }

  deleteQuestion(id: any) {

    Swal.fire({
      icon: 'question',
      title: 'Are you Sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {  
        this.id = id;
        this.questionService.deleteQuestion(id).subscribe(
          (data) => {
            Swal.fire("Success", "Deleted SuccessFully", "success");
            this.questionList = this.questionList.filter((question: any) => question.id != id);
          }, (error) => {
            Swal.fire("Error", "Something Went Wrong !!", "error");
          }
        )

      }
    })

  }

}
