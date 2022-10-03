import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view-category',
  templateUrl: './user-view-category.component.html',
  styleUrls: ['./user-view-category.component.css']
})
export class UserViewCategoryComponent implements OnInit {

  categories:any = [
    {
      title:"a",
      descrition:"a"
    },
  ];

  constructor(private categoryService:CategoryService,private route:ActivatedRoute,private router :Router) { }
  

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data:any) => {
        console.log(data);
        this.categories = data.categoryList;
      },(error:any) => {
        Swal.fire("Error", "Some thing went Wrong", "error");
      },
    )
  }

  viewCategory(catId:number){
    
    this.router.navigate(['user/'+catId]);
  }
}
