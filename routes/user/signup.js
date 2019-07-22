const express = require('express');
const router = express.Router();
const User = require("../../models/User")

router.get('/user/signup', (req, res) => {
  res.render('user/signup');
});

router.post('/user/signup', (req, res) => {
  
  let newUser = {
    username: req.body.username, 
    password: req.body.password
  }

  User.create(newUser)
    .then(()=> {
      res.redirect('/user/login');
    })
    .catch(()=> {
      res.send("error");
    })
});

module.exports = router;