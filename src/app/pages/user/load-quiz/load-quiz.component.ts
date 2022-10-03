import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId: any;
  public quizzes:any = [];
  constructor(private route: ActivatedRoute,private quizService:QuizService) { }

  ngOnInit(): void {
    this.catId = this.route.snapshot.params['catId'];
    console.log(this.catId);
    //All Quiz 
    if(this.catId == 0){
      this.quizService.activeQuizzes().subscribe(
        (data:any)=>{ 
          this.quizzes = data.quizDtos; 
          console.log(this.quizzes);
        },(error)=>{
          Swal.fire("Error","Error While Loading data","error");
        }
      )
    }else if(this.catId > 0){
      this.quizService.activeQuizOfCategories(this.catId).subscribe(
        (data:any)=>{ 
          this.quizzes = data.quizDtos; 
          console.log(this.quizzes);
        },(error)=>{
          Swal.fire("Error","Error While Loading data","error");
        }
      )


    }else{

    }

  }

  quizCall(title:String){

    alert("Title : "+title);
  }

}
