import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminUserService } from "./adminuser.service";
import { Owner } from "./owner.model";
import { Error } from "./error.model";
import { Router } from "@angular/router";
var AdminSigninComponent = /** @class */ (function () {
    //constructor(private authService: AuthService) {}
    function AdminSigninComponent(adminUserService, router) {
        this.adminUserService = adminUserService;
        this.router = router;
        this.display = 'none';
    }
    AdminSigninComponent.prototype.onSubmit = function () {
        var _this = this;
        var owner = new Owner(this.myForm.value.username, this.myForm.value.password);
        this.adminUserService.signin(owner)
            .subscribe(function (data) {
            console.log(data),
                localStorage.setItem('token', data.token);
            localStorage.setItem('ownerId', data.ownerId);
            if (data.message === "Successfully logged in") {
                _this.router.navigateByUrl('/admin');
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
    AdminSigninComponent.prototype.ngOnInit = 
    //  isLoggedIn() {
    //  return this.authService.isLoggedIn();
    //  }
    function () {
        this.myForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    };
    AdminSigninComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-adminsignin',
                    templateUrl: './adminsignin.component.html'
                },] },
    ];
    /** @nocollapse */
    AdminSigninComponent.ctorParameters = function () { return [
        { type: AdminUserService, },
        { type: Router, },
    ]; };
    return AdminSigninComponent;
}());
export { AdminSigninComponent };
