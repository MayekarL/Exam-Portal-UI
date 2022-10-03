import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private snack: MatSnackBar, private loginservice: LoginService,private router:Router) { }

  public loginData = {
    username: '',
    password: ''
  }

  ngOnInit(): void {
  }


  loginSubmit() {
    console.log("Login button clicked!");

    if (this.loginData.username == null || this.loginData.username.trim() == "") {
      this.snack.open("Enter Your User Name!", "ok");
      return;
    }

    if (this.loginData.password == "" || this.loginData.password == null) {
      this.snack.open("Enter Your Password!", "ok");
      return;
    }

    this.loginservice.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);

        this.loginservice.loginUser(data.token);
        console.log({data});
        this.loginservice.getCurrentUser().subscribe(
          (user:any)=>{
            console.log({user})
            this.loginservice.setUser(user);
            
            Swal.fire("Success", `Welcome ${user.userRequest.firstName} glad To see you here`, "success");

            if (this.loginservice.getUserRole()=="ADMIN"){

              this.router.navigate(['admin']);
              this.loginservice.loginStatusSubject.next(true);
            } else if (this.loginservice.getUserRole()=="NORMAL"){

              this.router.navigate(['user']);
              this.loginservice.loginStatusSubject.next(true);
            }else{
              this.loginservice.logout();
            }

          },(error:any)=>{
            Swal.fire("Error", "Wrong Password / User Name", "error");
          }
        )
      }, (error) => {
        Swal.fire("Please check your username/password", "Wrong Credentials", "error");
      }

    )
  }


}
