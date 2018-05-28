import { Component, Input } from "@angular/core";

import { Food } from "./food.model";
import { AdminService } from "./admin.service";
import { Router } from "@angular/router";
@Component({
    selector: 'app-food',
    template: `
<div class="col-md-3" style="padding-top:40px">
<div class="card" style="width: 18rem;">
<img class="card-img-top" src="{{food.picture}}" style="width:150px;height:160px;" >
<div class="card-body">
<h5 class="card-title">{{food.name}}</h5>
<p class="card-text">price:$ {{food.price}}.</p>
<a (click)="onDelete()" class="btn btn-danger">delete</a>
</div>
</div>
</div>

    `
})
export class AdminFoodItemComponent {
    @Input() food: Food;

    constructor(private adminService: AdminService, private router: Router) {}

  /*  onEdit() {
        this.messageService.editMessage(this.message);
    }*/

   onDelete() {
        this.adminService.deleteFood(this.food)
        .subscribe(
               result => console.log(result);

             }
         );
    }


}
