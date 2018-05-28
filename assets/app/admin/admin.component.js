import { Component } from "@angular/core";
import { Router } from "@angular/router";
var AdminComponent = /** @class */ (function () {
    function AdminComponent(router) {
        this.router = router;
    }
    AdminComponent.prototype.ngOnInit = function () {
        if ((localStorage.getItem('ownerId') === null) || (localStorage.getItem('token') === null)) {
            this.router.navigateByUrl('/adminuser');
        }
    };
    AdminComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-admin',
                    templateUrl: './admin.component.html'
                },] },
    ];
    //  isLoggedIn() {
    //  return this.authService.isLoggedIn();
    //  }
    /** @nocollapse */
    AdminComponent.ctorParameters = function () { return [
        { type: Router, },
    ]; };
    return AdminComponent;
}());
export { AdminComponent };
