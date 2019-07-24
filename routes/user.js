const mongoose = require('mongoose');
const express = require('express');
const router  = express.Router();
const User = require('../models/User')
var session = require('express-session')
const bcrypt = require("bcrypt");
const saltRounds = 10;

// USER SIGN UP 
router.get('/signup', function(req, res, next) {
    res.render('signup');
  });
  
router.post('/users/signup', function(req, res, next) {
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);
  
  let newUser = {
    username: req.body.username, 
    password: hashPass,
  }
  User.create(newUser)
    .then((user)=> {
      res.redirect('/login');
    })
    .catch(()=> {
      res.send("error");
    })
}); 
  
// USER LOGIN
router.get('/login', function(req, res, next) {
  res.render('login');
})

router.post('/login', function(req, res, next) {
  User.findOne({username : req.body.username})
  .then((user) => {
    if (user){
     bcrypt.compare(req.body.password, user.password, function(err, match){
       if(err) throw new Error("Encryption error");
       if (match) {
        req.session.user = user
        res.redirect('/user/profile')
       } 
       else {
        res.send('Invalid credentials');
       }})
      } else {
          res.send('Invalid credentials');
      }})
  .catch((err) => {
    res.send(err);
  })   
})

// USER PROFILE
router.get('/user/profile', function (req, res){
  res.render('user-profile');
})
  
// USER LOGOUT
router.get('/user/logout', function (req, res){
  req.session.destroy();
  res.redirect('/')
})  

module.exports = router