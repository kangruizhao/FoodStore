import { Routes, RouterModule } from "@angular/router";
import { ADMIN_ROUTES } from "./admin/admin.routes";
import { ADMINUSER_ROUTES } from "./adminuser/adminuser.routes";
import { MAIN_ROUTES } from "./mainpage/main.routes";
import {AppComponent} from "./app.component"
import {AdminComponent} from"./admin/admin.component"
import {MainComponent} from"./mainpage/main.component"
import {AdminUserComponent} from"./adminuser/adminuser.component"
const APP_ROUTES: Routes = [
     { path: '', redirectTo: 'main', pathMatch: 'full'},
    { path: 'main', component: MainComponent, children: MAIN_ROUTES},
    { path: 'admin', component: AdminComponent, children: ADMIN_ROUTES},
    { path: 'adminuser', component: AdminUserComponent, children: ADMINUSER_ROUTES},

];

export const routing = RouterModule.forRoot(APP_ROUTES);
