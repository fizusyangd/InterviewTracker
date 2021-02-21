const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const { requireAuth, checkUser }=require('./middleware/authMiddleware');
const adminRoutes=require('./routes/adminRouter');
const app=express();     // setting app to express method

const urlencodedParser=bodyParser.urlencoded({extended:false});  // parse application

const authRoutes=require('./routes/authRoutes');  // importing routes from authRoutes
const progroutes=require('./routes/programmingRoutes');

//view engine
app.set('view engine','ejs');

//middleware
app.use('/assets', express.static('assets'));  // it enables us to use static files like styles.css
app.use(cookieParser());
app.use(express.json());

//database connection
const dburl='mongodb+srv://agarwal:agarwal123@cluster0.upwnm.mongodb.net/authdb';
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result)=> app.listen(8000))
.catch((err)=> console.log(err));

//routes
app.use('/admin', adminRoutes);
app.get('*', checkUser);           // applying middleware to every single get requests
app.get('/programming', requireAuth);
app.use(authRoutes);
app.use(progroutes);

app.get('/experience', requireAuth, function(req,res){
  res.render('experience');
});

console.log("Now listening to the port 8000");
