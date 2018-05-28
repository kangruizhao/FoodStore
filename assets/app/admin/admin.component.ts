import { Component,OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
    constructor(private router: Router) {}
     ngOnInit() {
     if ((localStorage.getItem('ownerId') === null)||(localStorage.getItem('token') === null)){
       this.router.navigateByUrl('/adminuser');
     }
     }
  //  isLoggedIn() {
      //  return this.authService.isLoggedIn();
  //  }
}
