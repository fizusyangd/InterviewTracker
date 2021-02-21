const jwt=require('jsonwebtoken');
const User=require('../models/User');

const requireAuth= function(req,res,next){
  const token= req.cookies.jwt;

  // check json web token exists and is verified
  if(token){
    jwt.verify(token, "this secret message won't allow you to hack this token", (err, decodedToken)=>{
      if(err){
        res.redirect('/login');
      }
      else{
        console.log(decodedToken);
        next();
      }
    });
  }
  else{
    res.redirect('/login');
  }
}

//checking the current user
const checkUser=function(req,res,next){
  const token=req.cookies.jwt;

  if(token){
    jwt.verify(token, "this secret message won't allow you to hack this token",async (err, decodedToken)=>{
      if(err){
        res.locals.user=null;
        next();
      }
      else{
        console.log(decodedToken);
        let user=await User.findById(decodedToken.id);
        res.locals.user=user;
        next();
  }
});
}
else{
  res.locals.user=null;
  next();
}
}

module.exports={ requireAuth, checkUser };    // exporting this modules
