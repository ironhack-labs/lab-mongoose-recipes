const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');

router.get('/recipe/list', (req, res) => {
  if(req.session.user) {
    Recipe.find({})  
    .populate("cook")  
    .then((recipes) => {
        res.render('recipe/list', {recipes});
      });
    } else {
   res.redirect("/user/login")
  }
});

module.exports = router;