const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');
const Cook = require('../../models/Cook');

router.get('/create', (req, res, next) => {
  Cook.find({})
  .then((cooks) => {
    res.render('recipe/create', {cooks});
  })
  .catch((err)=> {
    next();
  });
});

router.post('/create', (req, res, next) => {

  let newRecipe = {
    title: req.body.title,
    level: req.body.level,
    ingredients: req.body.ingredients,
    cuisine: req.body.cuisine,
    dishType: req.body.dishType,
    image: req.body.image,
    duration: req.body.duration,
    cook: req.body.cook
  }

  Recipe.create(newRecipe)  
    .then((recipe) => {
        res.redirect(`/recipe/detail/${recipe._id}`);
    })
    .catch((err)=> {
      next();
    })
  });

module.exports = router;