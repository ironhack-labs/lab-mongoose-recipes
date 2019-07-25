const express = require('express');
const router  = express.Router();
const Recipe = require('../models/Recipe');
const Cook = require ('../models/Cook');
ObjectId = require('mongodb').ObjectID;

router.get("/", (req, res, next) => {
    Recipe.find({})
    .populate("cook")
    .then((recipes)=>{
        res.render('recipes', {recipes});
    })
  })
  
  router.get("/add", (req, res, next) => {
    Cook.find({})
    .then((cooks)=>{
      res.render('recipe-add', {cooks});
    })
  })
  
  router.post("/add", (req, res, next) => {
    const {title, level, ingredients, cuisine, dishType, image, duration, cook} = req.body;
    const newRecipe = new Recipe({title, level, ingredients, cuisine, dishType, image, duration, cook});
    if(title, level, ingredients, cuisine, dishType, image == "" || duration < 0){
      res.redirect('/recipes/add');
    } else{
    newRecipe.save()
    .then(() => {
      res.redirect('/recipes');
    })
    .catch((error) => {
      res.send(error)
    })
    }
  })

  router.get("/details", (req, res, next) => {
    const recipeId = req.query.id;
      Recipe.findById(recipeId, function (err, adventure) {})
      .populate("cook")
      .then((recipe)=> {
        res.render('recipe', {recipe});  
      })
  })

  router.get("/edit", (req, res, next) => {
    const recipeId = req.query.id;
    Recipe.findById(recipeId, function (err, adventure) {})
    .populate("cook")
    .then((recipe)=> {
      Cook.find({})
      .then((cooks)=>{
        res.render('recipe-edit', {recipe, cooks});  
      })
    })
    
  })
  
  router.post("/edit", (req, res, next) => {
    const {recipeId, title, level, ingredients, cuisine, dishType, image, duration, cook} = req.body;
    if(title, level, ingredients, cuisine, dishType, image == "" || duration < 0){
      res.redirect('/recipes/add');
    } else{
    Recipe.updateOne({_id: ObjectId(recipeId)}, { $set: {title, level, ingredients, cuisine, dishType, image, duration, cook}}, { new: true })
    .then((recipe) => {
      res.redirect('/recipes');
    })
    .catch((error) => {
      console.log(error);
    })
    }
  })

  router.get("/delete", (req, res, next) => {
    const recipeId = req.query.id;
    Recipe.findByIdAndDelete(recipeId, function (err, adventure) {})
    .then((recipe)=> {
      res.redirect('/recipes');
    })
  })

module.exports = router