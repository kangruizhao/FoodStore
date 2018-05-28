var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Food = require('./food');
var User= require('./users');
var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    foods: [{type:String}],
    //foods: [Food],

    price:{type:Number,required:true},
    address:{type: String, required: true}
});
schema.post('remove', function (order) {
  
    mongoose.model('User').findById(order.user._id, function (err, usera) {

        usera.orders.pull({ _id: order._id });
        usera.save();
    });
});
schema.post('save', function (order) {

    mongoose.model('User').findById(order.user._id, function (err, usera) {
        usera.checkList=[];
        usera.orders.push(order);
        usera.save();
    });
});
module.exports = mongoose.model('Order', schema);
