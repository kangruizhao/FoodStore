import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Order } from "./order.model";
import { MainPageService } from "./mainpage.service";
var MainCartComponent = /** @class */ (function () {
    function MainCartComponent(mainpageService, router) {
        this.mainpageService = mainpageService;
        this.router = router;
        this.total = 0.00;
    }
    MainCartComponent.prototype.haveitem = function () {
        return this.total > 0 && this.foods.length > 0;
    };
    MainCartComponent.prototype.ngOnInit = function () {
        var _this = this;
        if ((localStorage.getItem('userId') !== null) && (localStorage.getItem('token') !== null)) {
            this.mainpageService.getCheckList()
                .subscribe(function (foods) {
                _this.foods = foods;
                for (var _i = 0, _a = _this.foods; _i < _a.length; _i++) {
                    var food = _a[_i];
                    _this.total = _this.accAdd(_this.total, food.price);
                }
            }, function (error) { });
        }
        else {
            this.foods = this.mainpageService.getLocalFoods();
            for (var _i = 0, _a = this.foods; _i < _a.length; _i++) {
                var food = _a[_i];
                this.total = this.accAdd(this.total, food.price);
            }
            console.log(this.total);
        }
    };
    MainCartComponent.prototype.handledelete = function (deleted) {
        if (deleted === true) {
            this.total = 0.00;
            for (var _i = 0, _a = this.foods; _i < _a.length; _i++) {
                var food = _a[_i];
                this.total = this.accAdd(this.total, food.price);
            }
            console.log(this.total);
        }
    };
    MainCartComponent.prototype.accAdd = function (arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    };
    MainCartComponent.prototype.CheckOut = function () {
        if ((localStorage.getItem('userId') !== null) && (localStorage.getItem('token') !== null)) {
            var address = prompt("Please enter your address:");
            console.log(address);
            if (address == null || address.trim() == "") {
                return;
            }
            var foodids = [];
            for (var _i = 0, _a = this.foods; _i < _a.length; _i++) {
                var food = _a[_i];
                foodids.push(food.name);
            }
            console.log(foodids);
            var order = new Order(address, this.total, foodids);
            console.log(order.foodids);
            this.mainpageService.makeanorder(order)
                .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
            this.foods = [];
            this.total = 0.00;
        }
        else {
            this.router.navigateByUrl('/main/signin');
        }
    };
    MainCartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-maincart',
                    template: "<div class=\"col-md-10 col-md-offset-1\">\n        <div class=\"col-md-5\">\n         <span style=\"padding-left:40px\">#</span>\n        </div>\n        <div class=\"col-md-2\">\n         <span>Name</span>\n        </div>\n        <div class=\"col-md-2\">\n        <span>Price</span>\n        </div>\n        <div class=\"col-md-1\">\n        <span>Delete?</span>\n        </div>\n        </div>\n        <div class=\"col-md-10 col-md-offset-1\">\n        <hr style=\"border-color:black\">\n        </div>\n\n         <app-maincartfood\n         [food]=\"food\"\n          *ngFor=\"let food of foods\" (deleted)=\"handledelete($event)\"></app-maincartfood>\n\n\n\n          <div class=\"col-md-2 col-md-offset-8\">\n          <span><h2 style=\"color:#ba290d\">Subtotal:{{total}}</h2></span>\n          </div>\n          <div class=\"col-md-2 col-md-offset-9\">\n          <span *ngIf=\"haveitem()\"><a (click)=\"CheckOut()\" class=\"btn btn-primary\" id=\"cartfood\">Check Out</a></span>\n          </div>\n    "
                },] },
    ];
    /** @nocollapse */
    MainCartComponent.ctorParameters = function () { return [
        { type: MainPageService, },
        { type: Router, },
    ]; };
    return MainCartComponent;
}());
export { MainCartComponent };
