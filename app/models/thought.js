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
    return this._id.getTimestamp();
  });

ThoughtSchema.virtual('id')
  .get(function(){
  	console.log("THOUGHT ID: " + this._id)
    return this._id
  });

mongoose.model('Thought', ThoughtSchema);

