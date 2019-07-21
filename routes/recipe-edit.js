const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/recipe-edit/:id', (req, res) => {
  let id = req.params.id;
  Recipe.findById(id)  
  .then((recipe) => {
      res.render('recipe-list', {recipe});
    });
});

module.exports = router;