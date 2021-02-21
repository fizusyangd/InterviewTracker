const mongoose=require('mongoose');  // destructure mongoose from mongoose module
const { isEmail }=require('validator');  // deconstruct isEmail to validate email
const bcrypt=require('bcrypt');   // deconstruct bcrypt from bcrypt module

// creating schema for the user
const Schema=mongoose.Schema;

const userSchema=new Schema({
  email:{
    type: String,
    unique: true,
    required: [true, 'This field is required'],    // custom error message
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'] // validating email
  },
  password:{
    type: String,
    required: [true, 'This field is required'],   // custom error message
    minlength: [8, 'Minimum password length is 8 characters']
  },
  admin:{
    type:Boolean
  }
});

//hashing passwords before saving
userSchema.pre('save', async function(next){
  const salt= await bcrypt.genSalt();
  this.password=await bcrypt.hash(this.password,salt);
  next();
});

// static method to login user
userSchema.statics.login=async function(email, password){
  const user=await this.findOne({email});
  if(user){
    const auth=await bcrypt.compare(password, user.password);
    if(auth){
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email');
}

const User=mongoose.model('user', userSchema);  // creating user based on userSchema

module.exports=User;      // exporting user module
