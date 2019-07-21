const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.post('/recipe-remove/:id', (req, res) => {
  let id = req.params.id;
  Recipe.findOneAndDelete({_id: id})  
  .then(() => {
    Recipe.find({}) 
    .then((recipes) => {
      res.render('recipe-list', {recipes});
    });
  });
});

module.exports = router;