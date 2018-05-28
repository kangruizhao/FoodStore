import { Component } from "@angular/core";
import { AllOrder } from "./allorder.model";
import { AdminService } from "./admin.service";
@Component({
    selector: 'app-adminhome',
    template: `<div class="col-md-10 col-md-offset-1">
        <div class="col-md-3">
         <span style="padding-left:40px">Order Id</span>
        </div>
        <div class="col-md-2">
         <span>Foods Ordered</span>
        </div>
        <div class="col-md-1">
        <span>Subtotal</span>
        </div>
        <div class="col-md-2">
        <span>Address</span>
        </div>
        <div class="col-md-2">
        <span>Name of User</span>
        </div>
        </div>
        <div class="col-md-10 col-md-offset-1">
        <hr style="border-color:black">
        </div>

         <app-adminorder
         [allorder]="allorder"
          *ngFor="let allorder of allorders"></app-adminorder>

    `
})
export class AdminHomeComponent {
  allorders:AllOrder[];
    constructor(private adminService: AdminService) {}

  //  isLoggedIn() {
      //  return this.authService.isLoggedIn();
  //  }
  ngOnInit() {


    this.adminService.getorder()
        .subscribe(
            (allorders: AllOrder[]) => {
                this.allorders = allorders


              },

              error => { }
        );


  }
}
