import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Food } from "../admin/food.model";
import { Order } from "./order.model";
var MainPageService = /** @class */ (function () {
    function MainPageService(http) {
        this.http = http;
        this.foods = [];
        this.localfoods = [];
        this.globalfoods = [];
        this.myOrders = [];
    }
    MainPageService.prototype.CancelOrder = function (order) {
        this.myOrders.splice(this.myOrders.indexOf(order), 1);
        var body = JSON.stringify(order);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var userId = localStorage.getItem('userId');
        return this.http.delete('https://kangruirestaurant.herokuapp.com/user/cancelorder/' + order.id)
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            return Observable.throw(error.json());
        });
    };
    MainPageService.prototype.getorder = function () {
        var _this = this;
        var userId = localStorage.getItem('userId');
        return this.http.get('https://kangruirestaurant.herokuapp.com/user/getorder/' + userId)
            .map(function (response) {
            var orders = response.json().obj;
            var transformedOrders = [];
            for (var _i = 0, orders_1 = orders; _i < orders_1.length; _i++) {
                var order = orders_1[_i];
                transformedOrders.push(new Order(order.address, order.price, order.foods, order._id));
            }
            _this.myOrders = transformedOrders;
            return transformedOrders;
        })
            .catch(function (error) {
            return Observable.throw(error.json);
        });
    };
    MainPageService.prototype.makeanorder = function (order) {
        var userId = localStorage.getItem('userId');
        var body = JSON.stringify(order);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('https://kangruirestaurant.herokuapp.com/user/makeanorder/' + userId, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            return Observable.throw(error.json());
        });
    };
    MainPageService.prototype.addtoCartGlobal = function (food) {
        var userId = localStorage.getItem('userId');
        var body = JSON.stringify(food);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.patch('https://kangruirestaurant.herokuapp.com/user/addfoodcart/' + userId, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            return Observable.throw(error.json());
        });
    };
    MainPageService.prototype.deleteGobalFood = function (food) {
        food.foodid = String(this.globalfoods.indexOf(food));
        this.globalfoods.splice(this.globalfoods.indexOf(food), 1);
        var body = JSON.stringify(food);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var userId = localStorage.getItem('userId');
        return this.http.patch('https://kangruirestaurant.herokuapp.com/user/deletefood/' + userId, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            return Observable.throw(error.json());
        });
    };
    MainPageService.prototype.getCheckList = function () {
        var _this = this;
        var userId = localStorage.getItem('userId');
        return this.http.get('https://kangruirestaurant.herokuapp.com/user/getCheckList/' + userId)
            .map(function (response) {
            var foods = response.json().obj;
            var transformedFoods = [];
            for (var _i = 0, foods_1 = foods; _i < foods_1.length; _i++) {
                var food = foods_1[_i];
                transformedFoods.push(new Food(food.name, food.price, food.picture, food._id));
            }
            _this.globalfoods = transformedFoods;
            return transformedFoods;
        })
            .catch(function (error) {
            return Observable.throw(error.json);
        });
    };
    MainPageService.prototype.addlocaltoserver = function () {
        var userId = localStorage.getItem('userId');
        this.getLocalFoods();
        var body = JSON.stringify(this.localfoods);
        this.localfoods = [];
        localStorage.setItem('foodlist', null);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('https://kangruirestaurant.herokuapp.com/user/addserver/' + userId, body, { headers: headers })
            .map(function (response) { return response.json(); }).catch(function (error) {
            //this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MainPageService.prototype.signup = function (user) {
        if (user.cpassword != user.password)
            return Observable.throw({ title: "password not match", error: { message: "password not match" } });
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('https://kangruirestaurant.herokuapp.com/user/signup', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            //this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MainPageService.prototype.signin = function (user) {
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('https://kangruirestaurant.herokuapp.com/user/signin', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            //this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MainPageService.prototype.getFoods = function () {
        var _this = this;
        return this.http.get('https://kangruirestaurant.herokuapp.com/main/foods')
            .map(function (response) {
            var foods = response.json().obj;
            var transformedFoods = [];
            for (var _i = 0, foods_2 = foods; _i < foods_2.length; _i++) {
                var food = foods_2[_i];
                transformedFoods.push(new Food(food.name, food.price, food.picture, food._id));
            }
            _this.foods = transformedFoods;
            return transformedFoods;
        })
            .catch(function (error) {
            return Observable.throw(error.json);
        });
    };
    MainPageService.prototype.addtoCartLocal = function (food) {
        var foodsinlocal = JSON.parse(localStorage.getItem('foodlist'));
        if (foodsinlocal === null) {
            foodsinlocal = [];
        }
        // add to it,
        foodsinlocal.push({ name: food.name, price: food.price, picture: food.picture, _id: food.foodid });
        // then put it back.
        localStorage.setItem('foodlist', JSON.stringify(foodsinlocal));
    };
    MainPageService.prototype.getLocalFoods = function () {
        var transformedFoods = [];
        var foodsinlocal = JSON.parse(localStorage.getItem('foodlist'));
        if (foodsinlocal === null) {
            return transformedFoods;
        }
        for (var _i = 0, foodsinlocal_1 = foodsinlocal; _i < foodsinlocal_1.length; _i++) {
            var food = foodsinlocal_1[_i];
            transformedFoods.push(new Food(food.name, food.price, food.picture, food._id));
            this.localfoods = transformedFoods;
        }
        return transformedFoods;
    };
    MainPageService.prototype.deleteLocalFood = function (food) {
        this.localfoods.splice(this.localfoods.indexOf(food), 1);
        var foodsinlocal = JSON.parse(localStorage.getItem('foodlist'));
        for (var _i = 0, foodsinlocal_2 = foodsinlocal; _i < foodsinlocal_2.length; _i++) {
            var i = foodsinlocal_2[_i];
            if (i._id === food.foodid) {
                foodsinlocal.splice(foodsinlocal.indexOf(i), 1);
                break;
            }
        }
        localStorage.setItem('foodlist', JSON.stringify(foodsinlocal));
    };
    MainPageService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MainPageService.ctorParameters = function () { return [
        { type: Http, },
    ]; };
    return MainPageService;
}());
export { MainPageService };
