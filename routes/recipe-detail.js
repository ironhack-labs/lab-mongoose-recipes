const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/recipe-detail/:id', (req, res) => {
  let id = req.params.id;
  Recipe.findById(id)  
  .populate("cook")  
  .then((recipe) => {
      res.render('recipe-detail', {recipe});
    });
});

module.exports = router;