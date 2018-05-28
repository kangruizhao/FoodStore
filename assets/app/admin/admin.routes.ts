import { Routes } from "@angular/router";
import {AdminComponent} from"./admin.component";
import {AdminHomeComponent} from"./adminhome.component";
import {AddComponent} from"./add.component";
import {AdminMenuListComponent} from"./menulist.component";
export const ADMIN_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'add', component: AddComponent },
    { path: 'home', component: AdminHomeComponent }
    { path: 'menu', component: AdminMenuListComponent }

];
