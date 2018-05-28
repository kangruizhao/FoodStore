import { Injectable ,ErrorHandler} from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Owner } from "./owner.model";


@Injectable()
export class AdminUserService {
  //private foods: Food[] = [];
  constructor(private http: Http) {}
  signup(owner: Owner) {
    if(owner.cpassword!=owner.password)   return Observable.throw({title:"password not match",error:{message:"password not match"}});
    const body = JSON.stringify(owner);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://kangruirestaurant.herokuapp.com/admin/signup', body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => {
          //this.errorService.handleError(error.json());
          return Observable.throw(error.json());
        });
}
signin(owner: Owner) {
    const body = JSON.stringify(owner);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://kangruirestaurant.herokuapp.com/admin/signin', body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => {
            //this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
}


}
