import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  public category :any= {
    title: "",
    description: ""
  }
  constructor(private snack: MatSnackBar,private categoryService:CategoryService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if(this.checkValidation()){
      this.categoryService.createCategory(this.category).subscribe(
        (data:any)=>{
          
          Swal.fire("Success",`Category created with title : ${data.category.title} & id = ${data.category.cId}`,"success");

          this.router.navigate(['admin/categories']);
        },(error)=>{
          Swal.fire("Error",`Something Went Wrong `,"error");
        }
      )
    }

  }

  checkValidation(): boolean {
    if (this.category.title.trim() == "" || this.category.title == null) {
      this.snack.open("Enter  Title", "OK");
      return false;
    }
    if (this.category.description.trim() == "" || this.category.description == null) {
      this.snack.open("Enter  Description", "OK");
      return false;
    }
    return true;
  }

}
