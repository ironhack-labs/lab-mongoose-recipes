const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
});

const Recipe = mongoose.model('Recipe', {
title: String,
level: String,
ingredients: Array,
cuisine: String,
dishType: String,
image:  { type: String, default: 'images/default-avatar.png' },
duration: Number,
creator: String,
created: { type: Date, default: Date.now },
  });
module.exports = Recipe;
