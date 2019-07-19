const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/recipe-list', (req, res) => {
  debugger
  Recipe.find({})  
  .then((recipes) => {
    debugger
      console.log(recipes);
      res.render('recipe-list', {recipes});
    });
});

module.exports = router;