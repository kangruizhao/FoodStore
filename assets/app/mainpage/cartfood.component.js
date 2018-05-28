import { EventEmitter, Component, Input, Output } from "@angular/core";
import { Food } from "../admin/food.model";
import { MainPageService } from "./mainpage.service";
import { Router } from "@angular/router";
var MainCartFoodItemComponent = /** @class */ (function () {
    function MainCartFoodItemComponent(mainpageService, router) {
        this.mainpageService = mainpageService;
        this.router = router;
        this.deleted = new EventEmitter();
    }
    MainCartFoodItemComponent.prototype.onDelete = function () {
        if ((localStorage.getItem('userId') !== null) && (localStorage.getItem('token') !== null)) {
            this.mainpageService.deleteGobalFood(this.food)
                .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
        }
        else {
            this.mainpageService.deleteLocalFood(this.food);
        }
        this.deleted.emit(true);
    };
    MainCartFoodItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-maincartfood',
                    template: "\n      <div class=\"col-md-10 col-md-offset-1\">\n    <div class=\"col-md-5\">\n    <span><img class=\"card-img-top\" src=\"{{food.picture}}\" style=\"width:150px;height:160px;\" ></span>\n    </div>\n    <div class=\"col-md-2\">\n    <span><h3>{{food.name}}</h3></span>\n    </div>\n    <div class=\"col-md-2\">\n    <span><h3>{{food.price}}</h3></span>\n    </div>\n    <div class=\"col-md-1\" style=\"padding-top:20px\">\n    <span><a (click)=\"onDelete()\">delete</a></span>\n    </div>\n    </div>\n    <div class=\"col-md-10 col-md-offset-1\">\n    <hr style=\"border-color:black\">\n    </div>\n\n    "
                },] },
    ];
    /** @nocollapse */
    MainCartFoodItemComponent.ctorParameters = function () { return [
        { type: MainPageService, },
        { type: Router, },
    ]; };
    MainCartFoodItemComponent.propDecorators = {
        "food": [{ type: Input },],
        "deleted": [{ type: Output },],
    };
    return MainCartFoodItemComponent;
}());
export { MainCartFoodItemComponent };
