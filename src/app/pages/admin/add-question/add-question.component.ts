import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  qId: number = 0;
  qTitle: string = "Text";

  public question: any = {
    quiz: {
      qId: 0
    },
    content: '',
    image: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  } 

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private snack: MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qid'];
    this.qTitle = this.route.snapshot.params['title'];
    this.question.quiz.qId = this.qId;
    console.log(this.qId);
  }

  formSubmit() {
    if (this.checkValidation()) {
      this.questionService.addQuestions(this.question).subscribe(
        (data: any) => {
          Swal.fire("Success", "New Question Created : " + data.questionDto.content, "success");
          this.router.navigate(['/admin/view-question/'+this.qId+"/"+this.qTitle]);
        }, (error) => {
          Swal.fire("Error", "Something Went Wrong !", "error");

        }
      )
    }
  }

  checkValidation(): boolean {
    if (this.question.content.trim() == "" || this.question.content == null) {
      this.snack.open("Enter Question!", "Ok");
      return false;
    }
    if (this.question.option1.trim() == "" || this.question.option1 == null) {
      this.snack.open("Enter Option 1!", "Ok");
      return false;
    }
    if (this.question.option2.trim() == "" || this.question.option2 == null) {
      this.snack.open("Enter Option 2!", "Ok");
      return false;
    }
    if (this.question.option3.trim() == "" || this.question.option3 == null) {
      this.snack.open("Enter Option3!", "Ok");
      return false;
    }
    if (this.question.option4.trim() == "" || this.question.option4 == null) {
      this.snack.open("Enter Option 4!", "Ok");
      return false;
    }

    if (this.question.answer.trim() == "" || this.question.answer == null) {
      this.snack.open("Please Select Answer ", "Ok");
      return false;
    }

    return true;
  }
}
