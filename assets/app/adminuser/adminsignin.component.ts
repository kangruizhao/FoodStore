
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminUserService } from "./adminuser.service";
import { Owner } from "./owner.model";
import { Error } from "./error.model";
import { Router } from "@angular/router";
@Component({
    selector: 'app-adminsignin',
    templateUrl: './adminsignin.component.html'
  })
  export class AdminSigninComponent implements OnInit{
        myForm:FormGroup;
        display = 'none';
        error:Error;
    //constructor(private authService: AuthService) {}
    constructor(private adminUserService: AdminUserService,private router: Router) {}
    onSubmit() {
        const owner = new Owner(
            this.myForm.value.username,
            this.myForm.value.password
        );
        this.adminUserService.signin(owner)
            .subscribe(
                data => {console.log(data),
                localStorage.setItem('token', data.token);
                localStorage.setItem('ownerId', data.ownerId);
                if(data.message==="Successfully logged in"){
                  this.router.navigateByUrl('/admin');
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
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)

});
}
  }
