import {  EventEmitter,Component, Input,Output } from "@angular/core";
import { Order } from "./order.model";
import { Food } from "../admin/food.model";
import{MainPageService} from"./mainpage.service";
import { Router } from "@angular/router";
@Component({
    selector: 'app-mainorder',
    template: `
      <div class="col-md-10 col-md-offset-1">
    <div class="col-md-4">
    <span><h5>{{order.id}}</h5></span>
    </div>
    <div class="col-md-2">
    <ul>
    <li
        *ngFor="let id of order.foodids">
        <h4>
        {{id}}
        </h4>
        </li>
    </ul>
    </div>
    <div class="col-md-2">
    <span><h4>$ {{order.price}}</h4></span>
    </div>
    <div class="col-md-2">
    <span><h4>{{order.address}}</h4></span>
    </div>
    <div class="col-md-1">
    <span><a (click)="onDelete()">Cancel This Order</a></span>
    </div>
    </div>
    <div class="col-md-10 col-md-offset-1">
    <hr style="border-color:black">
    </div>

    `
})
export class SigleOrderComponent {
    @Input() order: Order;
    constructor(private mainpageService: MainPageService, private router: Router) {}

 onDelete(){
   if((localStorage.getItem('userId') !== null)&&(localStorage.getItem('token') !== null)){
     this.mainpageService.CancelOrder(this.order)
     .subscribe(
       data => console.log(data),
       error => console.log(error),
     );
   }
else{ this.router.navigateByUrl('/main/signin');}


}
    }
