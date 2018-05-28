import { Component } from "@angular/core";
import { MainPageService } from "./mainpage.service";
var MainMenuComponent = /** @class */ (function () {
    function MainMenuComponent(mainpageService) {
        this.mainpageService = mainpageService;
    }
    MainMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mainpageService.getFoods()
            .subscribe(function (foods) {
            _this.foods = foods;
        }, function (error) { });
    };
    MainMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-mainmenu',
                    template: "<div class=\"col-md-9 col-md-offset-1\">\n        <app-mainfood\n               [food]=\"food\"\n                *ngFor=\"let food of foods\"></app-mainfood>\n    </div>"
                },] },
    ];
    /** @nocollapse */
    MainMenuComponent.ctorParameters = function () { return [
        { type: MainPageService, },
    ]; };
    return MainMenuComponent;
}());
export { MainMenuComponent };
