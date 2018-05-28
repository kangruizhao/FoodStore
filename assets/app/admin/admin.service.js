import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { AllOrder } from "./allorder.model";
import { Food } from "./food.model";
var AdminService = /** @class */ (function () {
    function AdminService(http) {
        this.http = http;
        this.foods = [];
        this.allorders = [];
    }
    AdminService.prototype.add = function (food) {
        var body = JSON.stringify(food);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('https://kangruirestaurant.herokuapp.com/admin/addfood', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            //this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    AdminService.prototype.getFoods = function () {
        var _this = this;
        return this.http.get('https://kangruirestaurant.herokuapp.com/admin/foods')
            .map(function (response) {
            var foods = response.json().obj;
            var transformedFoods = [];
            for (var _i = 0, foods_1 = foods; _i < foods_1.length; _i++) {
                var food = foods_1[_i];
                transformedFoods.push(new Food(food.name, food.price, food.picture, food._id));
            }
            _this.foods = transformedFoods;
            return transformedFoods;
        })
            .catch(function (error) {
            return Observable.throw(error.json());
        });
    };
    AdminService.prototype.deleteFood = function (food) {
        this.foods.splice(this.foods.indexOf(food), 1);
        return this.http.delete('https://kangruirestaurant.herokuapp.com/admin/deletefood/' + food.foodid)
            .map(function (response) { return response.json(); });
    };
    AdminService.prototype.getorder = function () {
        var _this = this;
        return this.http.get('https://kangruirestaurant.herokuapp.com/admin/orders')
            .map(function (response) {
            var allorders = response.json().obj;
            var transformedAllOrders = [];
            for (var _i = 0, allorders_1 = allorders; _i < allorders_1.length; _i++) {
                var allorder = allorders_1[_i];
                console.log(allorder);
                transformedAllOrders.push(new AllOrder(allorder.address, allorder.price, allorder.foods, allorder._id, allorder.user.name));
            }
            _this.allorders = transformedAllOrders;
            return transformedAllOrders;
        })
            .catch(function (error) {
            return Observable.throw(error.json());
        });
    };
    AdminService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AdminService.ctorParameters = function () { return [
        { type: Http, },
    ]; };
    return AdminService;
}());
export { AdminService };
