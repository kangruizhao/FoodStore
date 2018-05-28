var express = require('express');
var router = express.Router();
var Food = require('../models/food');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/users');
var Order = require('../models/order');
router.delete('/cancelorder/:id', function (req, res, next) {

  Order.findById(req.params.id, function (err, order) {
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      if (!order) {
          return res.status(500).json({
              title: 'No Order Found!',
              error: {message: 'Food not found'}
          });
      }
      order.remove(function (err, result) {

          res.status(200).json({
              message: 'Cancel Order',
              obj: result
          });
      });
  });
});

router.post('/makeanorder/:id', function (req, res, next) {
   var orderID="";
    User.findById(req.params.id, function (err, user) {
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      var order = new Order({
          user: user,
          foods:req.body.foodids,
          price: req.body.price,
          address: req.body.address
      });
      var lock=true;
      order.save(function(error,result){
      if (error) {
          return res.status(500).json({
        title: 'An error occurred',
        error: error
         });
       }
       res.status(200).json({
              message: 'make order succesfully',
             obj: result
          });


     });

    });
   });








router.get('/getorder/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });

         }
         Order.find( {  "_id": { $in : user.orders } },function (err, orders) {
              if (err) {
                  return res.status(500).json({
                      title: 'An error occurred',
                      error: err
                  });
                   }
         res.status(200).json({
                message: 'get to account succesfully',
               obj: orders
            });
             });


  });
});





router.patch('/addfoodcart/:id',function (req, res, next) {
//  console.log('path')
User.findById(req.params.id, function (err, user) {
  if (err) {
      return res.status(500).json({
          title: 'An error occurred',
          error: err
      });
  }
  //console.log(user.checkList.length);
  Food.findById(req.body.foodid, function (err, food) {
    if (err) {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });
      }
        if(food){
          user.checkList.push(food);
          user.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
               message: 'add to account succesfully',
              obj: result
           });
          });
        }


});
});
});
router.patch('/deletefood/:id',function (req, res, next) {
//  console.log('path')
User.findById(req.params.id, function (err, user) {
  if (err) {
      return res.status(500).json({
          title: 'An error occurred',
          error: err
      });
  }
  //console.log(user.checkList.length);
  var tmplist=[];
  for (var i = 0; i <user.checkList.length; i++) {
    if(i!==req.body.foodid){
     tmplist.push(user.checkList[i]);
      }
}
user.checkList=tmplist;
user.save(function(err, result) {
  if (err) {
      return res.status(500).json({
          title: 'An error occurred',
          error: err
      });
  }
  res.status(200).json({
     message: 'add to account succesfully',
    obj: result
 });
});




});
});
router.get('/getCheckList/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });

         }
         Food.find( {  "_id": { $in : user.checkList } },function (err, foods) {
           if (err) {
               return res.status(500).json({
                   title: 'An error occurred',
                   error: err
               });
                }
                var objects = {};
                foods.forEach(o => objects[o._id] = o);
                var dupArray = user.checkList.map(id => objects[id]);
                res.status(200).json({
                       message: 'get to account succesfully',
                      obj: dupArray
                   });
         }
        )

  });
});


router.post('/addserver/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
    /*  for(var afood in req.body){
        //console.log(afood);
        Food.findById(req.body[afood].foodid,function(error,food){
          if (err) {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });

        }
        if (food){
        user.checkList.push(food);
        }

      });

    }*/
    var foodids=[];
    for(var afood in req.body){
      foodids.push(req.body[afood].foodid);
    }
     Food.find( {  "_id": { $in : foodids } },function (err, foods) {
          if (err) {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });
               }
               var objects = {};
               foods.forEach(o => objects[o._id] = o);
               var dupArray = foodids.map(id => objects[id]);
               user.checkList=dupArray;

           user.save(function(error,result){
      if (err) {
    return res.status(500).json({
        title: 'An error occurred',
        error: err
         });
       }
    res.status(200).json({
           message: 'add to account succesfully',
          obj: result
       });
    });
});
});
});
router.post('/signup', function (req, res, next) {
    var user = new User({
        name: req.body.name,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 10)

    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'this phone be used',
                error: err
            });
        }
        res.status(201).json({
            message: 'user created',
            obj: result
        });
    });
});
router.post('/signin', function(req, res, next) {
    User.findOne({phone: req.body.phone}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'phone or password invalid',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'phone or password invalid',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id,
            name: user.name
        });
    });
});


module.exports = router;
