import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
var AdminUserService = /** @class */ (function () {
    //private foods: Food[] = [];
    function AdminUserService(http) {
        this.http = http;
    }
    AdminUserService.prototype.signup = function (owner) {
        if (owner.cpassword != owner.password)
            return Observable.throw({ title: "password not match", error: { message: "password not match" } });
        var body = JSON.stringify(owner);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('https://kangruirestaurant.herokuapp.com/admin/signup', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            //this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    AdminUserService.prototype.signin = function (owner) {
        var body = JSON.stringify(owner);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('https://kangruirestaurant.herokuapp.com/admin/signin', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            //this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    AdminUserService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AdminUserService.ctorParameters = function () { return [
        { type: Http, },
    ]; };
    return AdminUserService;
}());
export { AdminUserService };
