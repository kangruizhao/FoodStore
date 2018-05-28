import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MainPageService } from "./mainpage.service";
var MyOrderComponent = /** @class */ (function () {
    function MyOrderComponent(mainpageService, router) {
        this.mainpageService = mainpageService;
        this.router = router;
    }
    MyOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        if ((localStorage.getItem('userId') !== null) && (localStorage.getItem('token') !== null)) {
            this.mainpageService.getorder()
                .subscribe(function (orders) {
                _this.orders = orders;
            }, function (error) { });
        }
        else {
            this.router.navigateByUrl('/main/signin');
        }
    };
    MyOrderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-mainorders',
                    template: "<div class=\"col-md-10 col-md-offset-1\">\n        <div class=\"col-md-4\">\n         <span style=\"padding-left:40px\">Order Id</span>\n        </div>\n        <div class=\"col-md-2\">\n         <span>Foods you Ordered</span>\n        </div>\n        <div class=\"col-md-2\">\n        <span>Subtotal</span>\n        </div>\n        <div class=\"col-md-2\">\n        <span>Address</span>\n        </div>\n        </div>\n        <div class=\"col-md-10 col-md-offset-1\">\n        <hr style=\"border-color:black\">\n        </div>\n\n         <app-mainorder\n         [order]=\"order\"\n          *ngFor=\"let order of orders\"></app-mainorder>\n\n    "
                },] },
    ];
    /** @nocollapse */
    MyOrderComponent.ctorParameters = function () { return [
        { type: MainPageService, },
        { type: Router, },
    ]; };
    return MyOrderComponent;
}());
export { MyOrderComponent };
