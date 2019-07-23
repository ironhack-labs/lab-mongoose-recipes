const express = require('express');
const router = express.Router();
const User = require("../../models/User")

router.get('/user/signup', (req, res) => {
  res.render('user/signup');
});

router.post('/user/signup', (req, res, next) => {
  
  let newUser = {
    username: req.body.username, 
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    favourite_cuisine: req.body.favourite_cuisine,
    dob: req.body.dob
  }

  User.find({username: req.body.username}) // Check username doesn't already exist
    .then((users) => {
      if(users) {
        throw new Error("Username already taken")
      } else {
        return User.create(newUser)
      }
    })
    .then((user)=> {
      res.redirect("/user/login")
    })
    .catch((err)=> {
      res.redirect("/user/signup")
      // res.locals.error = err;  // Not using separate error page for now
      // next();
    });

});

module.exports = router;