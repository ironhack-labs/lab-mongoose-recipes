const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/recipe-edit/:id', (req, res, next) => {
  let id = req.params.id;
  Recipe.findById(id)  
    .then((recipe) => {
        console.log(recipe);
        res.render('recipe-edit', {recipe});
    })
    .catch((error)=> {
      next();
    })
});

router.post('/recipe-edit/:id', (req, res, next) => {
  let id = req.params.id;

  console.log(req.body);
  console.log(req.body.title);


  let updatedRecipe = {
    title: req.body.title,
    level: req.body.level,
    ingredients: req.body.ingredients,
    cuisine: req.body.cuisine,
    dishType: req.body.dishType,
    image: req.body.image,
    duration: req.body.duration,
    creator: req.body.creator
  }

  Recipe.findByIdAndUpdate(id, updatedRecipe, {new:true})  
    .then((recipe) => {
        res.redirect(`/recipe-detail/${req.params.id}`);
    })
    .catch((error)=> {
      next();
    })
  });

module.exports = router;