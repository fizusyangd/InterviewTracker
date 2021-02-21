const Router=require('express');
const programmingController=require('../controller/programmingController');
const Section=require('../models/programmingTopics');
const Question=require('../models/programmingQuestions');

const programmingRoutes=Router();

programmingRoutes.get('/programming', programmingController.prog);

programmingRoutes.get('/programming/:topic_Name', programmingController.progSection);
programmingRoutes.post('/addquestion', programmingController.addques);


module.exports=programmingRoutes;
