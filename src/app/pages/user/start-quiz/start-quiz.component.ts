import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  qId: number = 0;
  questionList: any = [];

  marksGot: number = 0;
  correctAnswers: number = 0;
  attempted: number = 0;
  marksPerQuestion: number = 0;
  isSubmit: boolean = false;
  timer: any = 0;
  constructor(
    private locationStartegy: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this.route.snapshot.params['qId'];

    this.questionService.getQuestionsofQuizForTest(this.qId).subscribe(
      (data: any) => {
        this.startTimer();
        this.questionList = data.questionList;
        this.timer = this.questionList.length * 2 * 60;
        
        console.log(this.questionList);
      }, (error) => {
        Swal.fire("Error", "Something went wrong !", "error");
      }
    )
  }

  preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationStartegy.onPopState(() => {
      history.pushState(null, "", location.href);
    })
  }

  submitQuiz() {
    Swal.fire({
      icon: 'info',
      title: 'Do You want to Submit the quiz ?',
      confirmButtonText: 'Yes',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.calculateMarks();
      }
    })
  }
  calculateMarks() {
    this.isSubmit = true;
    //Start Calculation
    this.questionService.calculateMarks(this.questionList).subscribe(
      (data:any)=>{
        
        console.log(data);
        this.attempted = data.attempted;
        this.correctAnswers=data.correctAnswers;
        this.marksGot=data.marksGot;
        this.marksPerQuestion=data.marksPerQuestion;
      },(error)=>{
        Swal.fire("Error", "Something went wrong !", "error");  
      }
    )
  }

  startTimer(){
    let time:any = window.setInterval(() => {
      if (this.timer <= 0) {
        Swal.fire("Success","Your Time is over!","warning");
        this.calculateMarks();
        clearInterval(time);
      }else{
        this.timer--;
      }
    },1000);
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }
}


 

// this.questionList.forEach((q: any) => {
//   this.correctAnswers = 0;

//   if (q.givenAnswer == q.answer) {
//     this.marksPerQuestion = this.questionList[0].quiz.maxMarks / this.questionList.length;
//     this.correctAnswers++;
//   }

//   if (q.givenAnswer.trim() != '') {
//     this.attempted++;
//   }
// });
// this.marksGot = this.correctAnswers * this.marksPerQuestion;