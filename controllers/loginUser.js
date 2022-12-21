const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
   // store the username and password from the request
   const { username, password } = req.body;

   // find the user in the database and compare the passwords
   User.findOne({username:username}, (error, user)=>{
      if(user){
         bcrypt.compare(password, user.password, (error, same)=>  {
            if(same){
               // if passwords match, create a user session (covered later)
               console.log('Login Successful')
               req.session.userId = user._id
               res.redirect('/');
            }
            else{
               // if the passwords to not match, redirect to the login page
               console.error('Password not found');
               res.redirect('/auth/login');
            }
         })
      } // end if(user)
      else{
         // if the user is not found, redirect to the login page
         console.error('No User Found');
         res.redirect('/auth/login');
      }
   })
}