import {  EventEmitter,Component, Input,Output } from "@angular/core";
import { AllOrder } from "./allorder.model";

import { AdminService } from "./admin.service";
import { Router } from "@angular/router";
@Component({
    selector: 'app-adminorder',
    template: `
      <div class="col-md-10 col-md-offset-1">
    <div class="col-md-3">
    <span><h5>{{allorder.id}}</h5></span>
    </div>
    <div class="col-md-2">
    <ul>
    <li
        *ngFor="let id of allorder.foodids">
        <h4>
        {{id}}
        </h4>
        </li>
    </ul>
    </div>
    <div class="col-md-1">
    <span><h4>$ {{allorder.price}}</h4></span>
    </div>
    <div class="col-md-2">
    <span><h4>{{allorder.address}}</h4></span>
    </div>
    <div class="col-md-2">
    <span><h4>{{allorder.username}}</h4></span>
    </div>
    </div>
    <div class="col-md-10 col-md-offset-1">
    <hr style="border-color:black">
    </div>

    `
})
export class AdminOrderComponent {
    @Input() allorder: AllOrder;
    constructor(private adminService: AdminService, private router: Router) {}


    }
