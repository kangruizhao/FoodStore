import { Component } from "@angular/core";
var MainComponent = /** @class */ (function () {
    function MainComponent() {
    }
    MainComponent.prototype.isLoggedIn = function () {
        this.name = localStorage.getItem('username');
        return (localStorage.getItem('userId') !== null) && (localStorage.getItem('token') !== null);
    };
    MainComponent.prototype.logOut = function () {
        localStorage.clear();
        window.location.reload();
    };
    MainComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-main',
                    templateUrl: './main.component.html'
                },] },
    ];
    return MainComponent;
}());
export { MainComponent };
