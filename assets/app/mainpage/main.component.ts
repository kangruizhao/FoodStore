import { Component,OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html'
})
export class MainComponent  {
   name:string
   isLoggedIn() {
       this.name=localStorage.getItem('username')
       return (localStorage.getItem('userId') !== null)&&(localStorage.getItem('token') !== null);
   }
   logOut(){
       localStorage.clear();
       window.location.reload();
   }
}
