import { Component,OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Food } from "../admin/food.model";
import { Order } from "./order.model";
import{MainPageService} from"./mainpage.service";
@Component({
    selector: 'app-mainorders',
    template: `<div class="col-md-10 col-md-offset-1">
        <div class="col-md-4">
         <span style="padding-left:40px">Order Id</span>
        </div>
        <div class="col-md-2">
         <span>Foods you Ordered</span>
        </div>
        <div class="col-md-2">
        <span>Subtotal</span>
        </div>
        <div class="col-md-2">
        <span>Address</span>
        </div>
        </div>
        <div class="col-md-10 col-md-offset-1">
        <hr style="border-color:black">
        </div>

         <app-mainorder
         [order]="order"
          *ngFor="let order of orders"></app-mainorder>

    `

})
export class MyOrderComponent implements OnInit {
    orders: Order[];
    constructor(private mainpageService: MainPageService, private router: Router) {}

    ngOnInit() {
      if((localStorage.getItem('userId') !== null)&&(localStorage.getItem('token') !== null)){

      this.mainpageService.getorder()
          .subscribe(
              (orders: Order[]) => {
                  this.orders = orders


                  }

                error => { }
          );
        }
        else{
          this.router.navigateByUrl('/main/signin');
        }
    }


}
