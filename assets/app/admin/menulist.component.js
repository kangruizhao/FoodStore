import { Component } from "@angular/core";
import { AdminService } from "./admin.service";
var AdminMenuListComponent = /** @class */ (function () {
    function AdminMenuListComponent(adminService) {
        this.adminService = adminService;
    }
    AdminMenuListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getFoods()
            .subscribe(function (foods) {
            _this.foods = foods;
        });
    };
    AdminMenuListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-food-list',
                    template: "\n        <div class=\"col-md-9 col-md-offset-2\">\n            <app-food\n                   [food]=\"food\"\n                    *ngFor=\"let food of foods\"></app-food>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    AdminMenuListComponent.ctorParameters = function () { return [
        { type: AdminService, },
    ]; };
    return AdminMenuListComponent;
}());
export { AdminMenuListComponent };
