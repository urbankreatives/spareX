const { now } = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    pollUrl:{type:String, required:true},

    date:{type:Date, default:Date.now},
    amount:{type:Number, required:true},

  
  
});

module.exports = mongoose.model('Poll', schema);