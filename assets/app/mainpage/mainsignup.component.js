import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MainPageService } from "./mainpage.service";
import { User } from "./user.model";
import { Error } from "../adminuser/error.model";
import { Router } from "@angular/router";
var MainSignUpComponent = /** @class */ (function () {
    //constructor(private authService: AuthService) {}
    //  isLoggedIn() {
    //  return this.authService.isLoggedIn();
    function MainSignUpComponent(mainPageService, router) {
        this.mainPageService = mainPageService;
        this.router = router;
        this.display = 'none';
    }
    MainSignUpComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new User(this.myForm.value.phone, this.myForm.value.password, this.myForm.value.name, "id", this.myForm.value.cpassword);
        this.mainPageService.signup(user)
            .subscribe(function (data) { return console.log(data); }, function (error) {
            _this.error = new Error(error.title, error.error.message);
            _this.display = 'block';
        });
        //console.log(this.error);
        if (this.error.title === undefined) {
            this.router.navigateByUrl('/main/signin');
        }
    };
    MainSignUpComponent.prototype.ngOnInit = function () {
        this.myForm = new FormGroup({
            phone: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
            name: new FormControl(null, Validators.required),
            password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
            cpassword: new FormControl(null, Validators.required)
        });
    };
    MainSignUpComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-mainsignup',
                    templateUrl: './mainsignup.component.html'
                },] },
    ];
    //  }
    /** @nocollapse */
    MainSignUpComponent.ctorParameters = function () { return [
        { type: MainPageService, },
        { type: Router, },
    ]; };
    return MainSignUpComponent;
}());
export { MainSignUpComponent };
