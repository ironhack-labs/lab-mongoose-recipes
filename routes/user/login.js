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
          let sessionUser = {
            id: user._id,
            username: user.username,
            first_name: user.first_name
          }
          req.session.user = sessionUser; // Start a session
          res.redirect('/user/account');

        } else {
          res.send("Username or password not found");
        }
      } else {
        res.send("Username or password not found");
      }
    })
    .catch((err)=> {
      res.send(err)
    });
});

module.exports = router;