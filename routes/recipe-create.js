const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/recipe-create', (req, res, next) => {
  res.render('recipe-create');
  })
;

router.post('/recipe-create', (req, res, next) => {

  let newRecipe = {
    title: req.body.title,
    level: req.body.level,
    ingredients: req.body.ingredients,
    cuisine: req.body.cuisine,
    dishType: req.body.dishType,
    image: req.body.image,
    duration: req.body.duration,
    creator: req.body.creator
  }

  Recipe.create(newRecipe)  
    .then((recipe) => {
        res.redirect(`/recipe-detail/${recipe._id}`);
    })
    .catch((error)=> {
      next();
    })
  });

module.exports = router;