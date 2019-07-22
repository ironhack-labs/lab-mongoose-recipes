const express = require('express');
const router = express.Router();
// const User = require("../../models/User")

router.get("/user/account", (req,res)=> {
  if(req.session.user) {
    let username = req.session.user.username;
    res.render('user/account', {username})
  } else {
    res.redirect("/user/login")
  }
});

module.exports = router;