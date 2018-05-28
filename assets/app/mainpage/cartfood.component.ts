import {  EventEmitter,Component, Input,Output } from "@angular/core";

import { Food } from "../admin/food.model";
import{MainPageService} from"./mainpage.service";
import { Router } from "@angular/router";
@Component({
    selector: 'app-maincartfood',
    template: `
      <div class="col-md-10 col-md-offset-1">
    <div class="col-md-5">
    <span><img class="card-img-top" src="{{food.picture}}" style="width:150px;height:160px;" ></span>
    </div>
    <div class="col-md-2">
    <span><h3>{{food.name}}</h3></span>
    </div>
    <div class="col-md-2">
    <span><h3>{{food.price}}</h3></span>
    </div>
    <div class="col-md-1" style="padding-top:20px">
    <span><a (click)="onDelete()">delete</a></span>
    </div>
    </div>
    <div class="col-md-10 col-md-offset-1">
    <hr style="border-color:black">
    </div>

    `
})
export class MainCartFoodItemComponent {
    @Input() food: Food;
    @Output() public deleted:EventEmitter<any> = new EventEmitter<any>();
    constructor(private mainpageService: MainPageService, private router: Router) {}

 onDelete(){
         if((localStorage.getItem('userId') !== null)&&(localStorage.getItem('token') !== null)){
           this.mainpageService.deleteGobalFood(this.food)
           .subscribe(
             data => console.log(data),
             error => console.log(error),
           );
         }
    else{ this.mainpageService.deleteLocalFood(this.food);}

     this.deleted.emit(true);
    }




}
