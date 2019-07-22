const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');
const Cook = require('../../models/Cook');

router.get('/recipe/edit/:id', (req, res, next) => {
  let id = req.params.id;
  Recipe.findById(id)  
    .populate("cook")  
    .then((recipe) => {
      Cook.find({})
        .then((cooks)=>{
          res.render('recipe/edit', {recipe, cooks});
        })
    })
    .catch((err)=> {
      next();
    })
});

router.post('/recipe/edit/:id', (req, res, next) => {
  debugger
  let id = req.params.id;
  debugger

  let updatedRecipe = {
    title: req.body.title,
    level: req.body.level,
    ingredients: req.body.ingredients,
    cuisine: req.body.cuisine,
    dishType: req.body.dishType,
    image: req.body.image,
    duration: req.body.duration,
    cook: req.body.cook
  }
  debugger

  Recipe.findByIdAndUpdate(id, updatedRecipe, {new:true})  
    .then(() => {
      debugger
      res.redirect(`/recipe/detail/${req.params.id}`);
    })
    .catch((err)=> {
      console.log(err);
      next();
    })
  });

module.exports = router;