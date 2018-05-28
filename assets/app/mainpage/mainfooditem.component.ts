import { Component, Input } from "@angular/core";

import { Food } from "../admin/food.model";
import{MainPageService} from"./mainpage.service";
import { Router } from "@angular/router";
@Component({
    selector: 'app-mainfood',
    template: `
    <div class="col-md-3" style="padding-top:40px">
    <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="{{food.picture}}" style="width:150px;height:160px;" >
  <div class="card-body">
    <h5 class="card-title">{{food.name}}</h5>
    <p class="card-text">price:$ {{food.price}}.</p>
    <a (click)="addtoCart()" class="btn btn-primary" id="cartfood">Add to Cart</a>
  </div>
</div>
</div>
    `
})
export class MainFoodItemComponent {
    @Input() food: Food;

    constructor(private mainpageService: MainPageService, private router: Router) {}

 addtoCart() {
    if((localStorage.getItem('userId') !== null)&&(localStorage.getItem('token') !== null)){
        this.mainpageService.addtoCartGlobal(this.food).subscribe(
            result=>console.log(result);
            error => { };
      alert("Your put the "+this.food.name+" in to your cart");
    }
    else{
        this.mainpageService.addtoCartLocal(this.food);
        alert("Your put the "+this.food.name+" in to your cart");
      }
    }




}
