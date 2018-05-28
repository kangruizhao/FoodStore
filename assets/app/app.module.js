import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminComponent } from "./admin/admin.component";
import { AdminHomeComponent } from "./admin/adminhome.component";
import { AddComponent } from "./admin/add.component";
import { AdminOrderComponent } from "./admin/adminorder.component";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { HttpModule } from "@angular/http";
import { AdminService } from "./admin/admin.service";
import { MainMenuComponent } from "./mainpage/mainmenu.component";
import { MyOrderComponent } from "./mainpage/myorder.component";
import { SigleOrderComponent } from "./mainpage/sigleorder.component";
import { MainFoodItemComponent } from "./mainpage/mainfooditem.component";
import { MainCartComponent } from "./mainpage/cart.component";
import { MainCartFoodItemComponent } from "./mainpage/cartfood.component";
import { MainComponent } from "./mainpage/main.component";
import { AdminFoodItemComponent } from "./admin/fooditem.component";
import { AdminMenuListComponent } from "./admin/menulist.component";
import { AdminUserComponent } from "./adminuser/adminuser.component";
import { AdminUserService } from "./adminuser/adminuser.service";
import { MainPageService } from "./mainpage/mainpage.service";
import { AdminSigninComponent } from "./adminuser/adminsignin.component";
import { AdminSignupComponent } from "./adminuser/adminsignup.component";
import { MainSignInComponent } from "./mainpage/mainsignin.component";
import { MainSignUpComponent } from "./mainpage/mainsignup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [AppComponent,
                        AdminComponent,
                        AddComponent,
                        AdminHomeComponent,
                        AdminFoodItemComponent,
                        AdminMenuListComponent,
                        AdminUserComponent,
                        AdminSigninComponent,
                        AdminSignupComponent,
                        MainMenuComponent,
                        MainComponent,
                        MainFoodItemComponent,
                        MainCartComponent,
                        MainCartFoodItemComponent,
                        MainSignInComponent,
                        MainSignUpComponent,
                        MyOrderComponent,
                        SigleOrderComponent,
                        AdminOrderComponent
                    ],
                    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, routing],
                    providers: [AdminService, ErrorHandler, AdminUserService, MainPageService],
                    bootstrap: [AppComponent]
                },] },
    ];
    return AppModule;
}());
export { AppModule };
