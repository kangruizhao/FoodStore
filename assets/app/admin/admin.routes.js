import { RouterModule } from "@angular/router";
import { AdminHomeComponent } from "./adminhome.component";
import { AddComponent } from "./add.component";
import { AdminMenuListComponent } from "./menulist.component";
export var ADMIN_ROUTES = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'add', component: AddComponent },
    { path: 'home', component: AdminHomeComponent },
    { path: 'menu', component: AdminMenuListComponent }
];
export var adminRouting = RouterModule.forChild(ADMIN_ROUTES);
