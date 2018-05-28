import { Component,OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Food } from "../admin/food.model";
import{MainPageService} from"./mainpage.service";
@Component({
    selector: 'app-mainmenu',
    template: `<div class="col-md-9 col-md-offset-1">
        <app-mainfood
               [food]="food"
                *ngFor="let food of foods"></app-mainfood>
    </div>`
})
export class MainMenuComponent implements OnInit {
    foods: Food[];

    constructor(private mainpageService: MainPageService) {}

    ngOnInit() {
        this.mainpageService.getFoods()
            .subscribe(
                (foods: Food[]) => {
                    this.foods = foods;
                }
                error => { }
            );
    }
}
