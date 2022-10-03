import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  public quiz = {
    qId: 0,
    "title": "",
    "description": "",
    "maxMarks": 0,
    "numberOfQuestions": 0,
    "active": false,
    category: {
      cId: 0,
    },
  };

  categories = [
    {
      cId: 0,
      title: "MyTitle"
    }
  ];

  constructor(private route: ActivatedRoute, private quizService: QuizService, private categoryService: CategoryService, private router: Router, private snack: MatSnackBar) { }
  qId = 0;
  ngOnInit(): void {
    //Loading All Categories Start 
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data.categoryList;
        console.log(this.categories);
      }, (error) => {

      }
    )

    //Loading All Categories End 


    this.qId = this.route.snapshot.params['qid'];

    this.quizService.getQuiz(this.qId).subscribe(
      (data: any) => {
        console.log("Data");
        this.quiz = data.quizDto;
      }, (error) => {
        Swal.fire("Error", "No Data Found", "error");
      }
    )
  }

  //Updating Quiz 
  formSubmit() {

    this.quizService.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire("Success", "Updated !!", "success");
        this.router.navigate(['admin/view-quizzes']);
      }, (error) => {
        Swal.fire("error", "Something Went Wrong !", "error");
      }
    )

  }


  checkValidation() {

    if (this.quiz.title.trim() == "" || this.quiz.title == null) {
      this.snack.open("Enter Title", "Ok");
      return false;
    }
    if (this.quiz.description.trim() == "" || this.quiz.description == null) {
      this.snack.open("Enter Description", "Ok");
      return false;
    }
    if (this.quiz.maxMarks <= 0) {
      this.snack.open("Enter Marks", "Ok");
      return false;
    }
    if (this.quiz.numberOfQuestions <= 0) {
      this.snack.open("Enter Number Of Questions", "Ok");
      return false;
    }
    if (this.quiz.category == null || this.quiz.category.cId <= 0) {
      this.snack.open("Select Quiz Category ", "Ok");
      return false;
    }
    return true;
  }


}
