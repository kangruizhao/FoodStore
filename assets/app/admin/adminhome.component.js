import { Component } from "@angular/core";
import { AdminService } from "./admin.service";
var AdminHomeComponent = /** @class */ (function () {
    function AdminHomeComponent(adminService) {
        this.adminService = adminService;
    }
    //  isLoggedIn() {
    //  return this.authService.isLoggedIn();
    //  }
    //  isLoggedIn() {
    //  return this.authService.isLoggedIn();
    //  }
    AdminHomeComponent.prototype.ngOnInit = 
    //  isLoggedIn() {
    //  return this.authService.isLoggedIn();
    //  }
    function () {
        var _this = this;
        this.adminService.getorder()
            .subscribe(function (allorders) {
            _this.allorders = allorders;
        }, function (error) { });
    };
    AdminHomeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-adminhome',
                    template: "<div class=\"col-md-10 col-md-offset-1\">\n        <div class=\"col-md-3\">\n         <span style=\"padding-left:40px\">Order Id</span>\n        </div>\n        <div class=\"col-md-2\">\n         <span>Foods Ordered</span>\n        </div>\n        <div class=\"col-md-1\">\n        <span>Subtotal</span>\n        </div>\n        <div class=\"col-md-2\">\n        <span>Address</span>\n        </div>\n        <div class=\"col-md-2\">\n        <span>Name of User</span>\n        </div>\n        </div>\n        <div class=\"col-md-10 col-md-offset-1\">\n        <hr style=\"border-color:black\">\n        </div>\n\n         <app-adminorder\n         [allorder]=\"allorder\"\n          *ngFor=\"let allorder of allorders\"></app-adminorder>\n\n    "
                },] },
    ];
    /** @nocollapse */
    AdminHomeComponent.ctorParameters = function () { return [
        { type: AdminService, },
    ]; };
    return AdminHomeComponent;
}());
export { AdminHomeComponent };
