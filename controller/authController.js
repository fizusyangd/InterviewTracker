const User=require('../models/User');  // importing user module from user.js
const jwt=require('jsonwebtoken');

//handle errors
const handleErrors=function(err){
  console.log(err.message, err.code);
  let errors= { email: '', password: ''};

  //incorrect email
  if(err.message==='Incorrect email'){
    errors.email='email address not found';
  }

  //incorrect password
  if(err.message==='Incorrect password'){
    errors.password='Wrong password';
  }

  //duplicate error code
  if(err.code===11000){
    errors.email='That email is already registered';
    return errors;
  }

  //validation errors
  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties})=>{
      errors[properties.path]=properties.message;
    });
  }
  return errors;
}

// creating jwt token
const maxAge=60*60*24*3;
const createToken=(id)=>{
  return jwt.sign({ id }, "this secret message won't allow you to hack this token",{
    expiresIn: maxAge
  });
}

// exporting each module so that it can be used in authRoutes.js
module.exports.home_page=function(req,res){
  res.render('home');
}
module.exports.signup_get=function(req,res){
  res.render('signup');
}
module.exports.login_get=function(req,res){
  res.render('login');
}
module.exports.signup_post= async function(req,res){
  const { email, password }=req.body;
  try{
    const user=await User.create({ email, password });
    const token=createToken(user._id);
    res.cookie('jwt', token, {httpOnly:true, maxAge:maxAge*1000});   // cookie's age is in ms
    res.status(201).json({user:user._id});
  }
  catch(err){
    const errors=handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.login_post= async function(req,res){
const { email, password }=req.body;
try{
  const user= await User.login(email, password);
  const token=createToken(user._id);
  res.cookie('jwt', token, {httpOnly:true, maxAge:maxAge*1000});   // cookie's age is in ms
  res.status(200).json({user:user._id});
}
catch(err){
  const errors=handleErrors(err);
  res.status(400).json({ errors });
}
}

module.exports.logout_get=function(req,res){
  res.cookie('jwt', '', {maxAge: 1 });     // deleting the cookie within 1 ms
  res.redirect('/');                    // taking back to the home page
}
