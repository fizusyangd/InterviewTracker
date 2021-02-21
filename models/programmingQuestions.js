const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const programmingTopics= require('./programmingTopics');

const questionSchema=new Schema({
  Name:{
    type: String,
    unique: true,
    required: true
  },
  Link:{
    type: String,
    unique: true,
    required: true
  },
  Topic:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'programmingTopics'
  },
  Approved:{
    type:Boolean
  }
});

const programmingQuestions=mongoose.model('programmingQuestions', questionSchema);

module.exports= programmingQuestions;
