const express = require('express');
const router = express.Router();
const User = require("../../models/User");

router.get("/user/account", (req,res)=> {
    User.findOne({_id: req.session.user.id})
      .then((user) => {
        res.render('user/account', {user})
      })
      .catch((err) => {
        res.send(err);
      })
});

module.exports = router;