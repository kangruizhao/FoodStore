import { Component } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "./admin.service";
import { Food } from "./food.model";
@Component({
    selector: 'app-add',
    template: `
    <div class="alert alert-danger" role="alert" *ngIf="myForm.get('name').touched && myForm.get('name').hasError('required')">
      name field is required
      </div>
      <div class="alert alert-danger" role="alert" *ngIf="myForm.get('price').touched &&myForm.get('price').hasError('required')">
        Price field is required
        </div>
        <div class="alert alert-danger" role="alert" *ngIf="myForm.get('price').touched && myForm.get('price').hasError('pattern')">
          Price field illegal
          </div>
          <div class="alert alert-danger" role="alert" *ngIf="myForm.get('picture').touched && myForm.get('picture').hasError('required')">
            picture url field illegal
            </div>
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
            <label for="name">Name</label>
            <input
                    type="text"
                    id="name"
                    class="form-control"
                    formControlName="name"
                    >
        </div>
        <div class="form-group">
            <label for="price">Price</label>
           <input
                    type="text"
                    id="price"
                    class="form-control"
                    formControlName="price"
                    placeholder="the format of the price like 1.99"
                    >
        </div>
        <div class="form-group">
            <label for="picture">Picture Url</label>
           <input
                    type="text"
                    id="picture"
                    class="form-control"
                    formControlName="picture"
                    >
        </div>
        <button
                class="btn btn-primary"
                type="submit"
                [disabled]="!myForm.valid"
                >Submit</button>
    </form>`
})
export class AddComponent implements OnInit{
    myForm:FormGroup;
    constructor(private adminService: AdminService) {}

onSubmit() {
    const food = new Food(
        this.myForm.value.name,
        this.myForm.value.price,
        this.myForm.value.picture,
    );
    this.adminService.add(food)
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );
    this.myForm.reset();
}
    ngOnInit() {
      this.myForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    price: new FormControl(null, [
        Validators.required,
        //Validators.pattern("(0\.((0[1-9]{1})|([1-9]{1}([0-9]{1})?)))|(([1-9]+[0-9]*)(\.([0-9]{1,2}))?)")
        Validators.pattern(/^\d{1,8}(\.\d{2,2})$/)
    ]),
    picture: new FormControl(null, Validators.required)
     });
    }
}
