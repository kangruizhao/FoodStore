var express = require('express');
var router = express.Router();
var Food = require('../models/food');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

/* GET home page. */
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
module.exports = router;
