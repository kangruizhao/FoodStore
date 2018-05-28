import { Component, Input } from "@angular/core";
import { Order } from "./order.model";
import { MainPageService } from "./mainpage.service";
import { Router } from "@angular/router";
var SigleOrderComponent = /** @class */ (function () {
    function SigleOrderComponent(mainpageService, router) {
        this.mainpageService = mainpageService;
        this.router = router;
    }
    SigleOrderComponent.prototype.onDelete = function () {
        if ((localStorage.getItem('userId') !== null) && (localStorage.getItem('token') !== null)) {
            this.mainpageService.CancelOrder(this.order)
                .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
        }
        else {
            this.router.navigateByUrl('/main/signin');
        }
    };
    SigleOrderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-mainorder',
                    template: "\n      <div class=\"col-md-10 col-md-offset-1\">\n    <div class=\"col-md-4\">\n    <span><h5>{{order.id}}</h5></span>\n    </div>\n    <div class=\"col-md-2\">\n    <ul>\n    <li\n        *ngFor=\"let id of order.foodids\">\n        <h4>\n        {{id}}\n        </h4>\n        </li>\n    </ul>\n    </div>\n    <div class=\"col-md-2\">\n    <span><h4>$ {{order.price}}</h4></span>\n    </div>\n    <div class=\"col-md-2\">\n    <span><h4>{{order.address}}</h4></span>\n    </div>\n    <div class=\"col-md-1\">\n    <span><a (click)=\"onDelete()\">Cancel This Order</a></span>\n    </div>\n    </div>\n    <div class=\"col-md-10 col-md-offset-1\">\n    <hr style=\"border-color:black\">\n    </div>\n\n    "
                },] },
    ];
    /** @nocollapse */
    SigleOrderComponent.ctorParameters = function () { return [
        { type: MainPageService, },
        { type: Router, },
    ]; };
    SigleOrderComponent.propDecorators = {
        "order": [{ type: Input },],
    };
    return SigleOrderComponent;
}());
export { SigleOrderComponent };
