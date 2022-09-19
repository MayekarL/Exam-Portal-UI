import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  public quiz = {
    qId: 0,
    "title": "",
    "description": "",
    "maxMarks": 0,
    "numberOfQuestions": 0,
    "active":false,
    category:{
      cId:0,
    },
    //   private Long cId;
    // private String title;
    // private String description;
  };

  categories = [
    {
      cId : 0,
      title:"MyTitle"
    }
];

  

  constructor(private quizService: QuizService, private snack: MatSnackBar,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data:any) =>{
        this.categories = data.categoryList; 
        console.log(this.categories);
      },(error) =>{
        Swal.fire("Error","Some Thing Went Wrong !!","error");
      },
    )
  }

  formSubmit() {
    if (this.checkValidation()) {
      this.quizService.createQuiz(this.quiz).subscribe(
        (data: any) => {
          Swal.fire("Success", "New Quiz Created", data.status)
        }, (error) => {
          Swal.fire("Error", "Something Went Wrong", "error")
        }
      )
    }
  }

  checkValidation() {

    if(this.quiz.title.trim() == "" || this.quiz.title == null){
      this.snack.open("Enter Title","Ok");
      return false;
    }
    if(this.quiz.description.trim() == "" || this.quiz.description == null){
      this.snack.open("Enter Description","Ok");
      return false;
    }
    if(this.quiz.maxMarks <= 0 ){
      this.snack.open("Enter Marks","Ok");
      return false;
    }
    if(this.quiz.numberOfQuestions <= 0 ){
      this.snack.open("Enter Number Of Questions","Ok");
      return false;
    }
    if(this.quiz.category == null ||  this.quiz.category.cId <= 0){
      this.snack.open("Select Quiz Category ","Ok");
      return false;
    }
    return true;
  }

}
