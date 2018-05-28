
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import{MainPageService} from"./mainpage.service";
import { User } from "./user.model";
import { Error } from "../adminuser/error.model";
import { Router } from "@angular/router";
@Component({
    selector: 'app-mainsignup',
    templateUrl: './mainsignup.component.html'
  })
  export class MainSignUpComponent implements OnInit{
        myForm:FormGroup;
        display = 'none';
        error:Error;
    //constructor(private authService: AuthService) {}

  //  isLoggedIn() {
      //  return this.authService.isLoggedIn();
      constructor(private mainPageService: MainPageService,private router: Router) {}

  onSubmit() {
      const user = new User(
          this.myForm.value.phone,
          this.myForm.value.password,
          this.myForm.value.name,
          "id",
          this.myForm.value.cpassword

      );

      this.mainPageService.signup(user)
          .subscribe(
              data => console.log(data),
              error => {
              this.error= new Error(error.title, error.error.message);
              this.display='block';
              }
          );
      //console.log(this.error);
      if(this.error.title===undefined){
        this.router.navigateByUrl('/main/signin');
      }
  }
      ngOnInit() {
    this.myForm = new FormGroup({
        phone: new FormControl(null, [Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
        name: new FormControl(null, Validators.required),
        password: new FormControl(null, [Validators.required,Validators.minLength(5)]),
        cpassword: new FormControl(null, Validators.required)
    });
}
  //  }
  }
