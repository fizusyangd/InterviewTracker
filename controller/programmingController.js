const Section=require('../models/programmingTopics');
const Question=require('../models/programmingQuestions');

//function for displaying topics page
module.exports.prog =  (req, res) => {
    Section.find({}, (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.render('programming', {topics: data});
        }
    })

};

//function for showing questions of a particular topic
var ID = 0, name = "";
module.exports.progSection = (req, res) => {
    name = req.params.topic_name;
    Section.find({name}, (err, data) => {
        if(err){
            console.log(err);
        }else{
            ID = data[0].id;
           //console.log(ID);
            Question.find({ Topic : ID, Approved: 'true' } , (err, data) => {
                if(err){
                    console.log(err);
                }else{
                  //  console.log(data);
                    res.render('programming_Section', {ques: data});
                }
            })
        }
    });

};

module.exports.addques = async(req, res) => {
    const token = req.cookies.jwt;
    jwt.verify(token, "this secret message won't allow you to hack this token", async (err, decodedToken) => {
        let user = await User.findById(decodedToken.id);
        const {Name, Link} = req.body;
      //  console.log(Name, Link, user.admin);
        try {
            const ques = await Question.create({ Name, Link, Topic: ID, Approved: user.admin });
            res.status(201).json({ques : ques.Name, Name: name });
        }
        catch(err) {
            const errors = handleErrors(err);
        // console.log(errors);
            res.status(400).json({errors});
        }
    })
};
