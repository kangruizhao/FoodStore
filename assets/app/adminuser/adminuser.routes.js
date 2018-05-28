import { RouterModule } from "@angular/router";
import { AdminSigninComponent } from "./adminsignin.component";
import { AdminSignupComponent } from "./adminsignup.component";
//import {AddComponent} from"./add.component";
//import {AdminMenuListComponent} from"./menulist.component";
export var ADMINUSER_ROUTES = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: AdminSigninComponent },
    { path: 'signup', component: AdminSignupComponent }
];
export var adminuserRouting = RouterModule.forChild(ADMINUSER_ROUTES);
