const mongoose = require('mongoose');
const express = require('express');
const router  = express.Router();
const Recipe = require('../models/Recipe');
const Cook = require('../models/Cook');

// OPEN THE NEW RECIPE PAGE
router.get('/recipes', (req, res) => {
    Recipe.find({})
    .populate("cook")
    .then((recipes) => {
      res.render('recipes', {recipes})
    })
    .catch(err => {
      console.log(err)
    })
  })

// CREATE A NEW RECIPE
router.get('/add-recipe', (req, res) => {
  Cook.find({})
  .then((cooks) => {
    res.render("add-recipe", {cooks});
  })
  .catch((err)=> {
    console.log(err);
  })
})

router.post('/recipe/add', (req, res) => {
  let { title, level, ingredients, cuisine, dishType, image, duration, creator, created, cook } = req.body;
  const newRecipe = new Recipe({title, level, ingredients, cuisine, dishType, image, duration, creator, created, cook : mongoose.Types.ObjectId(cook) })
  newRecipe.save()
  .then((recipe) => {
    res.redirect('/recipes');
  })
  .catch((error) => {
    console.log(error);
  })
});

// OPEN THE EDIT RECIPE PAGE 
router.get('/edit-recipe/:id', (req, res) => {
  Recipe.findOne({_id : req.params.id})
  .populate("cook")
  .then((recipe) => {
    Cook.find({})
    .then((cooks) => {
      res.render("edit-recipe", {recipe, cooks});
    })
  })
  .catch((error) => {
     console.log(error)
  })
});

// EDIT THE RECIPE
router.post('/recipe/edit/:id', (req, res) => {
  let { title, level, ingredients, cuisine, dishType, image, duration, creator, created, cook } = req.body;
  Recipe.updateOne({_id : req.params.id}, {$set: {title, level, ingredients, cuisine, dishType, image, duration, creator, created, cook : mongoose.Types.ObjectId(req.body.cook)}})
    .then(recipe => {
    res.redirect('recipes'); 
  })
  .catch(err => {
     console.log(err)
  })
})

// DELETE A RECIPE
router.get('/recipe/delete/:id', (req, res) => {
  Recipe.deleteOne({_id : req.params.id})
  .then(recipe => {
  res.redirect('/recipes');
  })
    .catch((error) => {
     console.log(error)
    })
})

module.exports = router