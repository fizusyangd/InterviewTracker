const { Router }=require('express');  // destructure router from express package
const authController=require('../controller/authController'); // importing authController files and methods

const router=Router();       // setting router to Router method

// setting-up views
router.get('/', authController.home_page);
router.get('/login', authController.login_get);
router.get('/signup', authController.signup_get);
router.post('/login', authController.login_post);
router.post('/signup', authController.signup_post);
router.get('/logout', authController.logout_get);

module.exports=router;  // exporting this file so that it can be used in app.js or any other place
