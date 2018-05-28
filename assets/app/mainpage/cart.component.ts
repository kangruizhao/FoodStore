import { Component,OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Food } from "../admin/food.model";
import { Order } from "./order.model";
import{MainPageService} from"./mainpage.service";

@Component({
    selector: 'app-maincart',
    template: `<div class="col-md-10 col-md-offset-1">
        <div class="col-md-5">
         <span style="padding-left:40px">#</span>
        </div>
        <div class="col-md-2">
         <span>Name</span>
        </div>
        <div class="col-md-2">
        <span>Price</span>
        </div>
        <div class="col-md-1">
        <span>Delete?</span>
        </div>
        </div>
        <div class="col-md-10 col-md-offset-1">
        <hr style="border-color:black">
        </div>

         <app-maincartfood
         [food]="food"
          *ngFor="let food of foods" (deleted)="handledelete($event)"></app-maincartfood>



          <div class="col-md-2 col-md-offset-8">
          <span><h2 style="color:#ba290d">Subtotal:{{total}}</h2></span>
          </div>
          <div class="col-md-2 col-md-offset-9">
          <span *ngIf="haveitem()"><a (click)="CheckOut()" class="btn btn-primary" id="cartfood">Check Out</a></span>
          </div>
    `

})
export class MainCartComponent implements OnInit {
    foods: Food[];
    total:number = 0.00;
    constructor(private mainpageService: MainPageService, private router: Router) {}
   haveitem(){
     return this.total>0&&this.foods.length>0;
   }
    ngOnInit() {
       if((localStorage.getItem('userId') !== null)&&(localStorage.getItem('token') !== null)){
         this.mainpageService.getCheckList()
             .subscribe(
                 (foods: Food[]) => {
                     this.foods = foods;
                     for ( let food of this.foods) {
                       this.total=this.accAdd(this.total,food.price);


                     }

                 },
                   error => { }
             );
       }
       else {
        this.foods=this.mainpageService.getLocalFoods();
        for ( let food of this.foods) {
          this.total=this.accAdd(this.total,food.price);


        }
        console.log(this.total);
      }



    }
    handledelete(deleted:boolean){

        if(deleted===true){
           this.total=0.00;
          for (let food of this.foods) {
            this.total=this.accAdd(this.total,food.price);

          }
          console.log(this.total);

        }
    }
    accAdd(arg1, arg2) {
            var r1, r2, m;
            try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
            try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
            m = Math.pow(10, Math.max(r1, r2))
            return (arg1 * m + arg2 * m) / m
        }
    CheckOut(){
        if((localStorage.getItem('userId') !== null)&&(localStorage.getItem('token') !== null)){
          var address = prompt("Please enter your address:");
          console.log(address);
          if (address == null || address.trim() == "") {
                return;
           }
          var foodids=[];
          for ( let food of this.foods) {
                  foodids.push(food.name);
          }
          console.log(foodids);
          const order = new Order(
                 address,
                 this.total,
                 foodids
          );
          console.log(order.foodids);
          this.mainpageService.makeanorder(order)
              .subscribe(
                    data=>console.log(data),
                    error => console.log(error)

              );
              this.foods=[];
              this.total=0.00;

        }
        else{
          this.router.navigateByUrl('/main/signin');
        }
    }

}
