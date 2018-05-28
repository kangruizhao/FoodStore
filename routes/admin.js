var express = require('express');
var router = express.Router();
var Food = require('../models/food');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Owner = require('../models/owner');
var Order = require('../models/order');
/* GET home page. */
router.get('/orders', function (req, res, next) {
    Order.find()
        .populate('user', 'name')
        .exec(function (err, orders) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: orders
            });
        });
});
router.post('/addfood', function(req, res, next) {
  var food = new Food({
          name: req.body.name,
          price: req.body.price,
          picture: req.body.picture
      });
      food.save(function(err, result) {
    if (err) {
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });
    }
    res.status(201).json({
        message: 'food created',
        obj: result
    });
});
});
router.get('/foods', function (req, res, next) {
    Food.find({},function (err, foods) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: foods
            });
        });
})
router.post('/signup', function (req, res, next) {
    var owner = new Owner({
        name: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),

    });
    owner.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'this username be used',
                error: err
            });
        }
        res.status(201).json({
            message: 'owner created',
            obj: result
        });
    });
});
router.post('/signin', function(req, res, next) {
    Owner.findOne({name: req.body.username}, function(err, owner) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!owner) {
            return res.status(401).json({
                title: 'username or password invalid',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, owner.password)) {
            return res.status(401).json({
                title: 'username or password invalid',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: owner}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            ownerId: owner._id
        });
    });
});
router.delete('/deletefood/:id', function (req, res, next) {
    Food.findById(req.params.id, function (err, food) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!food) {
            return res.status(500).json({
                title: 'No Food Found!',
                error: {message: 'Food not found'}
            });
        }
        food.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted food',
                obj: result
            });
        });
    });
});

module.exports = router;
