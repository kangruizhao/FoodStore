import { Component, Input } from "@angular/core";
import { AllOrder } from "./allorder.model";
import { AdminService } from "./admin.service";
import { Router } from "@angular/router";
var AdminOrderComponent = /** @class */ (function () {
    function AdminOrderComponent(adminService, router) {
        this.adminService = adminService;
        this.router = router;
    }
    AdminOrderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-adminorder',
                    template: "\n      <div class=\"col-md-10 col-md-offset-1\">\n    <div class=\"col-md-3\">\n    <span><h5>{{allorder.id}}</h5></span>\n    </div>\n    <div class=\"col-md-2\">\n    <ul>\n    <li\n        *ngFor=\"let id of allorder.foodids\">\n        <h4>\n        {{id}}\n        </h4>\n        </li>\n    </ul>\n    </div>\n    <div class=\"col-md-1\">\n    <span><h4>$ {{allorder.price}}</h4></span>\n    </div>\n    <div class=\"col-md-2\">\n    <span><h4>{{allorder.address}}</h4></span>\n    </div>\n    <div class=\"col-md-2\">\n    <span><h4>{{allorder.username}}</h4></span>\n    </div>\n    </div>\n    <div class=\"col-md-10 col-md-offset-1\">\n    <hr style=\"border-color:black\">\n    </div>\n\n    "
                },] },
    ];
    /** @nocollapse */
    AdminOrderComponent.ctorParameters = function () { return [
        { type: AdminService, },
        { type: Router, },
    ]; };
    AdminOrderComponent.propDecorators = {
        "allorder": [{ type: Input },],
    };
    return AdminOrderComponent;
}());
export { AdminOrderComponent };
