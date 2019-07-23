const express = require('express');
const router = express.Router();
const User = require("../../models/User")

router.get('/user/login', (req, res) => {
  res.render('user/login');
});

router.post('/user/login', (req, res) => {
  User.findOne({username: req.body.username})
    .then((user)=> {
      if(user) {
        if(user.password === req.body.password) {
          // Log in
          req.session.user = user; // Start a session
          console.log(user);
          res.redirect('/user/account');

        } else {
          res.send("Username or password not found");
        }
      } else {
        res.send("Username or password not found");
      }
    })
    .catch((error)=> {
      res.send('error')
    });
});

module.exports = router;