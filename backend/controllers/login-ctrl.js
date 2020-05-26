const express = require('express')
const usersModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const passport = require('passport')


// For .env file
dotenv.config();
// access config var in .env file
process.env.TOKEN_SECRET;


function generateAccessToken(username) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '10h' });
}


exports.validateLogin = (req, res) => {

	passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Login failed. Please try to login again',
                user: user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           console.log(user);
           // generate a signed son web token with the contents of user and return it in the response
           const jwt = generateAccessToken({username: user.username});
			return res.status(200).json({
				userid : user._id,
				username : user.username, 
				firstname : user.firstName, 
				lastname: user.lastName, 
				role: user.role, 
				token:jwt
			});
        });
    })(req, res);
}