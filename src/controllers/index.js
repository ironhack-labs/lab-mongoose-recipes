// const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

const saveRecipe = ( recipe ) => {
  Recipe.create(recipe)
  .then(response => console.log(response))
  .catch(err => console.log(err));
};

const saveAllRecipes = ( recipes ) => {
  Recipe.insertMany(recipes)
  .then(response => console.log(response))
  .catch(err => console.log(err));
};

const updateByTitle = (title, updateParams) => {
  Recipe.findOneAndUpdate({ title : title } , updateParams )
  .then(resp => console.log(resp))
  .catch(err => console.log(err));
};

const deleteOneByTitle = (title) => {
  Recipe.deleteOne({ title })
  .then(resp => console.log(resp))
  .catch(err => console.log(err));
};

const getAllRecipes = () => {
  Recipe.find({ })
  .then()
};


module.exports = {
  saveRecipe,
  saveAllRecipes,
  updateByTitle,
  deleteOneByTitle,
};