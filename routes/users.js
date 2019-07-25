var express = require('express');
var router = express.Router();
var User = require("../models/User")
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');

router.use(cookieParser()) 


router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if(err) throw err;
    else{
    let newUser = {
        username: req.body.username, 
        password: hash
        }
    User.findOne({username: newUser.username})
    .then((user)=> {
        if(user || newUser.username == "" || newUser.password == "") { 
          res.send("Invalid credentials")
        } 
        else{
          User.create(newUser)
          .then((user)=> {
            res.redirect('/users/login');
          })
          .catch(()=> {
            res.send("error");
          })
        }
    })
    }
    });
  
})

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  User.findOne({username: req.body.username})
    .then((user)=> {
      if(user){
        bcrypt.compare(req.body.password, user.password).then(function(match) {
            if(match){
                req.session.user = user;
                res.redirect('/');
            }
            else{
                res.send("Invalid credentials");  
            }
        });
      } else {
        res.send("Invalid credentials");
      }
    })
    .catch((error)=> {
      res.send("error", error)
    })
});

router.get("/logout", (req,res)=> {
  req.session.destroy();
  res.redirect("/");
})

module.exports = router;