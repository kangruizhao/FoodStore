var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Food = require('./food');
var Order = require('./order');
var schema = new Schema({
    name: {type: String, required: true},
    phone:{type:Number,required:true,unique: true},
    checkList:[{type: Schema.Types.ObjectId, ref: 'Food'}],
    //checkList:[Food],
    password: {type: String, required: true},
    orders:[{type: Schema.Types.ObjectId, ref: 'Order'}]
    //orders:[Order]
});

schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('User', schema);
