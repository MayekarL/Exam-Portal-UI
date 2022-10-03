import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId: number = 0;
  quiz: any = null;
  constructor(private route: ActivatedRoute, private quizService: QuizService,private router:Router) { }

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qId'];
    this.quizService.getQuiz(this.qId).subscribe(
      (data:any) => {
        this.quiz= data.quizDto;  
      }, (error) => {
        Swal.fire("Error", "Something Went Wrong !", "error")
      }
    )
  }
  // [routerLink]="'/user/start/quiz/'+quiz.qId"
  startQuiz(qId:number){
    Swal.fire({
      icon:'info',
      title:'Have You Read the Instructions Properly ?',
      confirmButtonText:'Proceed',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        var url= '/start/quiz/'+qId;
        this.router.navigate([url]);
      }
    })
    
    
  }

}
