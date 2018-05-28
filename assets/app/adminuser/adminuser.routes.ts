import { Routes,RouterModule } from "@angular/router";
import {AdminSigninComponent} from"./adminsignin.component";
import {AdminSignupComponent} from"./adminsignup.component";
//import {AddComponent} from"./add.component";
//import {AdminMenuListComponent} from"./menulist.component";
export const ADMINUSER_ROUTES: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: AdminSigninComponent },
    { path: 'signup', component: AdminSignupComponent }

];
export const adminuserRouting = RouterModule.forChild(ADMINUSER_ROUTES);
