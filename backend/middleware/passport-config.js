const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const usersModel = require('../models/users')


passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
	(username, password, done) => {
		console.log("username", username);
		console.log("password", password);
		
	usersModel.findOne ({username}, (err, user) => {
		if(err){
			return done(err);
		}
		if(!user) {
			return done(null, false, {message:"User not found"});
		}
		
		
		bcrypt.compare(password, user.password, function(err,result){
			
			 if (result == true) {
			 	return done(null, user);

			} else {
				return done(null, false);
			}
	})
		//.catch( err => console.log(err))
	
	})
}
));
