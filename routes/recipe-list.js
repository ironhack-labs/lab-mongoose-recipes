const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/recipe-list', (req, res) => {
  Recipe.find({})  
  .populate("cook")  
  .then((recipes) => {
      res.render('recipe-list', {recipes});
    });
});

module.exports = router;