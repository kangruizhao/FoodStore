import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "./admin.service";
import { Food } from "./food.model";
var AddComponent = /** @class */ (function () {
    function AddComponent(adminService) {
        this.adminService = adminService;
    }
    AddComponent.prototype.onSubmit = function () {
        var food = new Food(this.myForm.value.name, this.myForm.value.price, this.myForm.value.picture);
        this.adminService.add(food)
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
        this.myForm.reset();
    };
    AddComponent.prototype.ngOnInit = function () {
        this.myForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            price: new FormControl(null, [
                Validators.required,
                //Validators.pattern("(0\.((0[1-9]{1})|([1-9]{1}([0-9]{1})?)))|(([1-9]+[0-9]*)(\.([0-9]{1,2}))?)")
                Validators.pattern(/^\d{1,8}(\.\d{2,2})$/)
            ]),
            picture: new FormControl(null, Validators.required)
        });
    };
    AddComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-add',
                    template: "\n    <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"myForm.get('name').touched && myForm.get('name').hasError('required')\">\n      name field is required\n      </div>\n      <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"myForm.get('price').touched &&myForm.get('price').hasError('required')\">\n        Price field is required\n        </div>\n        <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"myForm.get('price').touched && myForm.get('price').hasError('pattern')\">\n          Price field illegal\n          </div>\n          <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"myForm.get('picture').touched && myForm.get('picture').hasError('required')\">\n            picture url field illegal\n            </div>\n    <form [formGroup]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n        <div class=\"form-group\">\n            <label for=\"name\">Name</label>\n            <input\n                    type=\"text\"\n                    id=\"name\"\n                    class=\"form-control\"\n                    formControlName=\"name\"\n                    >\n        </div>\n        <div class=\"form-group\">\n            <label for=\"price\">Price</label>\n           <input\n                    type=\"text\"\n                    id=\"price\"\n                    class=\"form-control\"\n                    formControlName=\"price\"\n                    placeholder=\"the format of the price like 1.99\"\n                    >\n        </div>\n        <div class=\"form-group\">\n            <label for=\"picture\">Picture Url</label>\n           <input\n                    type=\"text\"\n                    id=\"picture\"\n                    class=\"form-control\"\n                    formControlName=\"picture\"\n                    >\n        </div>\n        <button\n                class=\"btn btn-primary\"\n                type=\"submit\"\n                [disabled]=\"!myForm.valid\"\n                >Submit</button>\n    </form>"
                },] },
    ];
    /** @nocollapse */
    AddComponent.ctorParameters = function () { return [
        { type: AdminService, },
    ]; };
    return AddComponent;
}());
export { AddComponent };
