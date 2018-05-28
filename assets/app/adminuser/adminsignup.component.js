import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminUserService } from "./adminuser.service";
import { Owner } from "./owner.model";
import { Error } from "./error.model";
import { Router } from "@angular/router";
var AdminSignupComponent = /** @class */ (function () {
    //constructor(private authService: AuthService) {}
    //  isLoggedIn() {
    //  return this.authService.isLoggedIn();
    function AdminSignupComponent(adminUserService, router) {
        this.adminUserService = adminUserService;
        this.router = router;
        this.display = 'none';
    }
    AdminSignupComponent.prototype.onSubmit = function () {
        var _this = this;
        var owner = new Owner(this.myForm.value.username, this.myForm.value.password, this.myForm.value.cpassword);
        this.adminUserService.signup(owner)
            .subscribe(function (data) { return console.log(data); }, function (error) {
            _this.error = new Error(error.title, error.error.message);
            _this.display = 'block';
        });
        //console.log(this.error);
        if (this.error.title === undefined) {
            this.router.navigateByUrl('/adminuser');
        }
    };
    AdminSignupComponent.prototype.ngOnInit = function () {
        this.myForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
            cpassword: new FormControl(null, Validators.required)
        });
    };
    AdminSignupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-adminsignup',
                    templateUrl: './adminsignup.component.html'
                },] },
    ];
    //  }
    /** @nocollapse */
    AdminSignupComponent.ctorParameters = function () { return [
        { type: AdminUserService, },
        { type: Router, },
    ]; };
    return AdminSignupComponent;
}());
export { AdminSignupComponent };
