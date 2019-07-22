const express = require('express');
const router = express.Router();
const Cook = require('../../models/Cook');

router.get('/cook/list', (req, res) => {
  if(req.session.user) {
      Cook.find({})  
      .then((cooks) => {
          res.render('cook/list', {cooks});
        });
     } else {
     res.redirect("/user/login")
   }
});

module.exports = router;