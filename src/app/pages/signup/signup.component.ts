import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

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
    var validation:boolean= this.isValidated();
    console.log(validation);
    if (validation == true) {
      this.userService.addUser(this.user).subscribe(
        (data) => {
          console.log("Data : ", data);
          alert("Congrats You have been registered Successfully!");
        }, (error) => {
          console.log("Error", error);
          alert("Something Went Wrong");
        }
      )
    }
  }

  isValidated(): boolean {

    if (this.user.firstName == "" || this.user.firstName == null) {
      alert("Enter Your First Name");
      return false;
    }

    if (this.user.lastName == "" || this.user.lastName == null) {
      alert("Enter Your last Name");
      return false;
    }

    if (this.user.email == "" || this.user.email == null) {
      alert("Enter Your Email ");
      return false;
    }

    if (this.user.contactNumber == "" || this.user.contactNumber == null) {
      alert("Enter Your Contact Number");
      return false;
    }

    if (this.user.password == "" || this.user.password == null) {
      alert("Enter Your Password");
      return false;
    }

    return true;
  }
}
