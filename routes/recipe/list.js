const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');

router.get('/list', (req, res) => {
  Recipe.find({})  
  .populate("cook")  
  .then((recipes) => {
      res.render('recipe/list', {recipes});
    })
    .catch((err)=> {
      console.log(err);
      res.send("Error");
    });
});

module.exports = router;