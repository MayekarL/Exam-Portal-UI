import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchAll } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar,private login:LoginService) { }

  ngOnInit(): void {
  }

  public user = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    about: '',
  }

  formSubmit() {
    var validation: boolean = this.isValidated();
    console.log(validation);
    if (validation == true) {
      this.userService.addUser(this.user).subscribe(
        (data: any) => {
          console.log("Data : ", data);
          Swal.fire("Success", "Welcome " + data.userList[0].firstName + " you have been registered with Id : " +data.userList[0].id , "success");
        }, (error:any) => {
          console.log("Error", error);
          var errorMessage:string = (error.error.message=="USER_ALREADY_EXISTS") ?"User Exist with "+this.user.email+" email Id, Please try with different email" : "Something went Wrong";
          this.snack.open(errorMessage, "", {
            duration: 5000
          });
        }
      )
    }
  }

  isValidated(): boolean {

    if (this.user.firstName == "" || this.user.firstName == null) {
      this.snack.open("Enter Your First Name", "ok");
      return false;
    }

    if (this.user.lastName == "" || this.user.lastName == null) {
      this.snack.open("Enter Your last Name", "ok");
      return false;
    }

    if (this.user.email == "" || this.user.email == null) {
      this.snack.open("Enter Your Email ", "ok");
      return false;
    }

    if (this.user.contactNumber == "" || this.user.contactNumber == null) {
      this.snack.open("Enter Your Contact Number", "ok");
      return false;
    }

    if (this.user.password == "" || this.user.password == null) {
      this.snack.open("Enter Your Password", "ok");
      return false;
    }

    if (this.user.contactNumber.length > 10 || this.user.contactNumber.length < 10) {
      console.log(this.user.contactNumber.length);
      this.snack.open("Please Enter 10 Digit Contact Number", "ok");
      return false;
    }

    return true;
  }
}
