import { Routes,RouterModule} from "@angular/router";
import {MainSignInComponent} from"./mainsignin.component";
import {MainSignUpComponent} from"./mainsignup.component";
import {MainCartComponent} from"./cart.component";
import {MainMenuComponent} from"./mainmenu.component";
import {MyOrderComponent} from"./myorder.component";
export const MAIN_ROUTES: Routes = [
    { path: '', redirectTo: 'menu', pathMatch: 'full' },
    { path: 'menu', component: MainMenuComponent },
    { path: 'cart', component: MainCartComponent },
    { path: 'signin', component: MainSignInComponent },
    { path: 'signup', component: MainSignUpComponent },
    { path: 'myorder', component: MyOrderComponent }
];
export const mainRouting = RouterModule.forChild(MAIN_ROUTES);
