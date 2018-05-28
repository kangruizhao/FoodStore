var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');


var schema = new Schema({
    name: {type: String, required: true},
    price:{type:Number,required:true},
    picture: {type: String, required: true},
});
module.exports = mongoose.model('Food', schema);
