import { Component, Input } from "@angular/core";
import { Food } from "./food.model";
import { AdminService } from "./admin.service";
import { Router } from "@angular/router";
var AdminFoodItemComponent = /** @class */ (function () {
    function AdminFoodItemComponent(adminService, router) {
        this.adminService = adminService;
        this.router = router;
    }
    /*  onEdit() {
          this.messageService.editMessage(this.message);
      }*/
    /*  onEdit() {
            this.messageService.editMessage(this.message);
        }*/
    AdminFoodItemComponent.prototype.onDelete = /*  onEdit() {
            this.messageService.editMessage(this.message);
        }*/
    function () {
        this.adminService.deleteFood(this.food)
            .subscribe(function (result) { return console.log(result); });
    };
    AdminFoodItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-food',
                    template: "\n<div class=\"col-md-3\" style=\"padding-top:40px\">\n<div class=\"card\" style=\"width: 18rem;\">\n<img class=\"card-img-top\" src=\"{{food.picture}}\" style=\"width:150px;height:160px;\" >\n<div class=\"card-body\">\n<h5 class=\"card-title\">{{food.name}}</h5>\n<p class=\"card-text\">price:$ {{food.price}}.</p>\n<a (click)=\"onDelete()\" class=\"btn btn-danger\">delete</a>\n</div>\n</div>\n</div>\n\n    "
                },] },
    ];
    /** @nocollapse */
    AdminFoodItemComponent.ctorParameters = function () { return [
        { type: AdminService, },
        { type: Router, },
    ]; };
    AdminFoodItemComponent.propDecorators = {
        "food": [{ type: Input },],
    };
    return AdminFoodItemComponent;
}());
export { AdminFoodItemComponent };
