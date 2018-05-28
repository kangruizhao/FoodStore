import { Injectable ,ErrorHandler} from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
  import { User } from "./user.model";
import { Food } from "../admin/food.model";
import { Order } from "./order.model";

@Injectable()
export class MainPageService {
  private foods: Food[] = [];
    private localfoods: Food[] = [];
    private globalfoods: Food[] = [];
    private myOrders: Order[] = [];
  constructor(private http: Http) {}
   CancelOrder(order:Order){
     this.myOrders.splice(this.myOrders.indexOf(order), 1);
     const body = JSON.stringify(order);

      const headers = new Headers({'Content-Type': 'application/json'});
    var userId=localStorage.getItem('userId');
    return this.http.delete('https://kangruirestaurant.herokuapp.com/user/cancelorder/'+order.id)
        .map((response: Response) => response.json())
        .catch((error: Response) => {

              return Observable.throw(error.json());
          });
   }
  getorder(){
    var userId=localStorage.getItem('userId');
    return this.http.get('https://kangruirestaurant.herokuapp.com/user/getorder/'+userId)
        .map((response: Response) => {
            const orders = response.json().obj;
            let transformedOrders: Order[] = [];
            for (let order of orders) {
                transformedOrders.push(new Order(
                    order.address,
                    order.price,
                    order.foods,
                    order._id
                  )
                );
            }
            this.myOrders = transformedOrders;
            return transformedOrders;
        })
        .catch((error: Response) => {
            return Observable.throw(error.json);
        });
  }
  makeanorder(order:Order){
  var userId=localStorage.getItem('userId');
  const body =JSON.stringify(order);
  const headers = new Headers({'Content-Type': 'application/json'});
  return this.http.post('https://kangruirestaurant.herokuapp.com/user/makeanorder/'+userId,body,{headers:headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
            return Observable.throw(error.json());
        });
  }
  addtoCartGlobal(food:Food){
  var userId=localStorage.getItem('userId');
  const body =JSON.stringify(food);
  const headers = new Headers({'Content-Type': 'application/json'});
  return this.http.patch('https://kangruirestaurant.herokuapp.com/user/addfoodcart/'+userId,body,{headers:headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
            return Observable.throw(error.json());
        });
  }
  deleteGobalFood(food: Food) {
       food.foodid=String(this.globalfoods.indexOf(food));
       this.globalfoods.splice(this.globalfoods.indexOf(food), 1);
       const body = JSON.stringify(food);
        const headers = new Headers({'Content-Type': 'application/json'});
      var userId=localStorage.getItem('userId');
      return this.http.patch('https://kangruirestaurant.herokuapp.com/user/deletefood/'+userId,body,{headers:headers})
          .map((response: Response) => response.json())
          .catch((error: Response) => {

                return Observable.throw(error.json());
            });

  }
  getCheckList() {
    var userId=localStorage.getItem('userId');
      return this.http.get('https://kangruirestaurant.herokuapp.com/user/getCheckList/'+userId)
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
              this.globalfoods = transformedFoods;
              return transformedFoods;
          })
          .catch((error: Response) => {
              return Observable.throw(error.json);
          });
  }
  addlocaltoserver(){
       var userId=localStorage.getItem('userId');
       this.getLocalFoods();
       const body =JSON.stringify(this.localfoods);
       this.localfoods=[];
       localStorage.setItem('foodlist',null);
       const headers = new Headers({'Content-Type': 'application/json'});
       return this.http.post('http://localhost:3000/user/addserver/'+userId, body, {headers: headers})
           .map((response: Response) => response.json()).catch((error: Response) => {
             //this.errorService.handleError(error.json());
             return Observable.throw(error.json());
           });
  }
  signup(user: User) {
    if(user.cpassword!=user.password)   return Observable.throw({title:"password not match",error:{message:"password not match"}});
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/signup', body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => {
          //this.errorService.handleError(error.json());
          return Observable.throw(error.json());
        });
}
signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => {
            //this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
}

  getFoods() {
      return this.http.get('http://localhost:3000/main/foods')
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
              return Observable.throw(error.json);
          });
  }
  addtoCartLocal(food:Food){
    var foodsinlocal = JSON.parse(localStorage.getItem('foodlist'));
    if(foodsinlocal===null){
      foodsinlocal=[];
    }
   // add to it,
   foodsinlocal.push({name:food.name,price:food.price,picture:food.picture,_id:food.foodid});
   // then put it back.
   localStorage.setItem('foodlist', JSON.stringify(foodsinlocal));
  }

  getLocalFoods(){

    let transformedFoods: Food[] = [];
    var foodsinlocal = JSON.parse(localStorage.getItem('foodlist'));
    if(foodsinlocal===null){
      return transformedFoods;
    }
    for (let food of foodsinlocal) {
        transformedFoods.push(new Food(
            food.name,
            food.price,
            food.picture,
            food._id
          )
        );
        this.localfoods=transformedFoods
    }
    return transformedFoods;
  }
  deleteLocalFood(food:Food){
    this.localfoods.splice(this.localfoods.indexOf(food), 1);
    var foodsinlocal = JSON.parse(localStorage.getItem('foodlist'));
    for(let i of foodsinlocal){
      if(i._id===food.foodid){
        foodsinlocal.splice(foodsinlocal.indexOf(i), 1);
        break ;
      }
    }
    localStorage.setItem('foodlist', JSON.stringify(foodsinlocal));
  }
}
