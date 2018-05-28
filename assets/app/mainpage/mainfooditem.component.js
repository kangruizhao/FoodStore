import { Component, Input } from "@angular/core";
import { Food } from "../admin/food.model";
import { MainPageService } from "./mainpage.service";
import { Router } from "@angular/router";
var MainFoodItemComponent = /** @class */ (function () {
    function MainFoodItemComponent(mainpageService, router) {
        this.mainpageService = mainpageService;
        this.router = router;
    }
    MainFoodItemComponent.prototype.addtoCart = function () {
        var _this = this;
        if ((localStorage.getItem('userId') !== null) && (localStorage.getItem('token') !== null)) {
            this.mainpageService.addtoCartGlobal(this.food).subscribe(function (result) {
                console.log(result);
                alert("Your put the " + _this.food.name + " in to your cart");
            }, function (error) { });
        }
        else {
            this.mainpageService.addtoCartLocal(this.food);
            alert("Your put the " + this.food.name + " in to your cart");
        }
    };
    MainFoodItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-mainfood',
                    template: "\n    <div class=\"col-md-3\" style=\"padding-top:40px\">\n    <div class=\"card\" style=\"width: 18rem;\">\n  <img class=\"card-img-top\" src=\"{{food.picture}}\" style=\"width:150px;height:160px;\" >\n  <div class=\"card-body\">\n    <h5 class=\"card-title\">{{food.name}}</h5>\n    <p class=\"card-text\">price:$ {{food.price}}.</p>\n    <a (click)=\"addtoCart()\" class=\"btn btn-primary\" id=\"cartfood\">Add to Cart</a>\n  </div>\n</div>\n</div>\n    "
                },] },
    ];
    /** @nocollapse */
    MainFoodItemComponent.ctorParameters = function () { return [
        { type: MainPageService, },
        { type: Router, },
    ]; };
    MainFoodItemComponent.propDecorators = {
        "food": [{ type: Input },],
    };
    return MainFoodItemComponent;
}());
export { MainFoodItemComponent };
