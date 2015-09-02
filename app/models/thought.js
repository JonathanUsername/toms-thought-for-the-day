// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ThoughtSchema = new Schema({
  toptext: String,
  bottomtext: String,
  img: String
});

ThoughtSchema.virtual('date')
  .get(function(){
    var isodate = this._id.getTimestamp()
    console.log("Date", isodate)
    var date = new Date(isodate).toGMTString().slice(0,-13)
    console.log(date)
    return date;
  });

ThoughtSchema.virtual('id')
  .get(function(){
    return this._id
  });

mongoose.model('Thought', ThoughtSchema);

