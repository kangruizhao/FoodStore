
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminUserService } from "./adminuser.service";
import { Owner } from "./owner.model";
import { Error } from "./error.model";
import { Router } from "@angular/router";
@Component({
    selector: 'app-adminsignup',
    templateUrl: './adminsignup.component.html'
  })
  export class AdminSignupComponent implements OnInit{
        myForm:FormGroup;
        display = 'none';
        error:Error;
    //constructor(private authService: AuthService) {}

  //  isLoggedIn() {
      //  return this.authService.isLoggedIn();
      constructor(private adminUserService: AdminUserService,private router: Router) {}

  onSubmit() {
      const owner = new Owner(
          this.myForm.value.username,
          this.myForm.value.password,
          this.myForm.value.cpassword,
      );
      this.adminUserService.signup(owner)
          .subscribe(
              data => {console.log(data);
              this.router.navigateByUrl('/adminuser');}
              ,
              error => {
              this.error= new Error(error.title, error.error.message);
              this.display='block';
              }
          );
      //console.log(this.error);
    
  }
      ngOnInit() {
    this.myForm = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, [Validators.required,Validators.minLength(5)]),
        cpassword: new FormControl(null, Validators.required)
    });
}
  //  }
  }
