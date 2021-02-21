const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const programmingSchema=new Schema({
  Name:{
    type: String,
    unique: true,
    required: true
  }
});

const programmingTopics=mongoose.model('programmingTopics', programmingSchema);

module.exports= programmingTopics;
