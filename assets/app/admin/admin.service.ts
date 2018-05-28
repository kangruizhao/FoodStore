import { Injectable ,ErrorHandler} from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { AllOrder } from "./allorder.model";
import { Food } from "./food.model";


@Injectable()
export class AdminService {
  private foods: Food[] = [];
  private allorders: AllOrder[] = [];
  constructor(private http: Http) {}
  add(food: Food) {
    const body = JSON.stringify(food);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://kangruirestaurant.herokuapp.com/admin/addfood', body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => {
          //this.errorService.handleError(error.json());
          return Observable.throw(error.json());
        });
}
getFoods() {
    return this.http.get('https://kangruirestaurant.herokuapp.com/admin/foods')
        .map((response: Response) => {
            const foods = response.json().obj;
            let transformedFoods: Food[] = [];
            for (let food of foods) {
                transformedFoods.push(new Food(
                    food.name,
                    food.price,
                    food.picture,
                    food._id
                  )
                );
            }
            this.foods = transformedFoods;
            return transformedFoods;
        })
        .catch((error: Response) => {
            return Observable.throw(error.json());
        });
}
deleteFood(food: Food) {
     this.foods.splice(this.foods.indexOf(food), 1);
    return this.http.delete('https://kangruirestaurant.herokuapp.com/admin/deletefood/' + food.foodid)
        .map((response: Response) => response.json());

}
getorder(){
  return this.http.get('https://kangruirestaurant.herokuapp.com/admin/orders')
      .map((response: Response) => {
          const allorders = response.json().obj;
          let transformedAllOrders: AllOrder[] = [];
          for (let allorder of allorders) {
            console.log(allorder);
              transformedAllOrders.push(new AllOrder(
                  allorder.address,
                  allorder.price,
                  allorder.foods,
                  allorder._id,
                  allorder.user.name,
                )
              );
          }
          this.allorders = transformedAllOrders;
          return transformedAllOrders;
      })
      .catch((error: Response) => {
          return Observable.throw(error.json());
      });
}
}
