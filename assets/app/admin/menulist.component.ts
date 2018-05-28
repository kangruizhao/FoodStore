import { Component, OnInit } from "@angular/core";
import { Food } from "./Food.model";
import { AdminService } from "./admin.service";

@Component({
    selector: 'app-food-list',
    template: `
        <div class="col-md-9 col-md-offset-2">
            <app-food
                   [food]="food"
                    *ngFor="let food of foods"></app-food>
        </div>
    `
})
export class AdminMenuListComponent implements OnInit {
    foods: Food[];

    constructor(private adminService: AdminService) {}

    ngOnInit() {
        this.adminService.getFoods()
            .subscribe(
                (foods: Food[]) => {
                    this.foods = foods;
                }
            );
    }
}
