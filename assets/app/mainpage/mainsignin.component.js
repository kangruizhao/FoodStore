import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MainPageService } from "./mainpage.service";
import { User } from "./user.model";
import { Error } from "../adminuser/error.model";
import { Router } from "@angular/router";
var MainSignInComponent = /** @class */ (function () {
    //constructor(private authService: AuthService) {}
    function MainSignInComponent(mainPageService, router) {
        this.mainPageService = mainPageService;
        this.router = router;
        this.display = 'none';
    }
    MainSignInComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new User(this.myForm.value.phone, this.myForm.value.password, "user", "id", "this.myForm.value.cpassword");
        this.mainPageService.signin(user)
            .subscribe(function (data) {
            console.log(data),
                localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('username', data.name);
            if ((localStorage.getItem('userId') !== null) && (localStorage.getItem('token') !== null)) {
                _this.mainPageService.addlocaltoserver()
                    .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
                _this.router.navigateByUrl('/');
            }
        }, function (error) {
            _this.error = new Error(error.title, error.error.message);
            _this.display = 'block';
        });
        this.myForm.reset();
    };
    //  isLoggedIn() {
    //  return this.authService.isLoggedIn();
    //  }
    //  isLoggedIn() {
    //  return this.authService.isLoggedIn();
    //  }
    MainSignInComponent.prototype.ngOnInit = 
    //  isLoggedIn() {
    //  return this.authService.isLoggedIn();
    //  }
    function () {
        this.myForm = new FormGroup({
            phone: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    };
    MainSignInComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-mainsignin',
                    templateUrl: './mainsignin.component.html'
                },] },
    ];
    /** @nocollapse */
    MainSignInComponent.ctorParameters = function () { return [
        { type: MainPageService, },
        { type: Router, },
    ]; };
    return MainSignInComponent;
}());
export { MainSignInComponent };
