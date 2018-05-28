
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import{MainPageService} from"./mainpage.service";
import { User } from "./user.model";
import { Error } from "../adminuser/error.model";
import { Router } from "@angular/router";
@Component({
    selector: 'app-mainsignin',
    templateUrl: './mainsignin.component.html'
  })
  export class MainSignInComponent implements OnInit{
        myForm:FormGroup;
        display = 'none';
        error:Error;
    //constructor(private authService: AuthService) {}
    constructor(private mainPageService: MainPageService,private router: Router) {}
    onSubmit() {
      const user = new User(
          this.myForm.value.phone,
          this.myForm.value.password,
          "user",
          "id",
          "this.myForm.value.cpassword"

      );

        this.mainPageService.signin(user)
            .subscribe(
                data => {console.log(data),
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('username', data.name);
                if((localStorage.getItem('userId') !== null)&&(localStorage.getItem('token') !== null)){

                    this.mainPageService.addlocaltoserver()
                    .subscribe(
                      data => console.log(data),
                      error => console.log(error),
                    );
                    this.router.navigateByUrl('/');
                }
              },
                error => {
                this.error= new Error(error.title, error.error.message);
                this.display='block';
                }
            );

        this.myForm.reset();
    }
  //  isLoggedIn() {
      //  return this.authService.isLoggedIn();
  //  }
  ngOnInit() {
this.myForm = new FormGroup({
    phone: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)

});
}
  }
