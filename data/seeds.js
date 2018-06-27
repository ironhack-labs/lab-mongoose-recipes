require('../configs/db.config');

const Recipe = require('../models/recipe.model');
const recipes = require('../data/recipes.data');

Recipe.insertMany(recipes)
.then(recipes => console.log(`${recipes.length} recipes inserted`))
.catch(err => console.log(err))
