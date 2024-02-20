require('dotenv').config();
require('./configs/db.config');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const Recipe = require('./models/Recipe.model');
const data = require('./data');

Recipe.deleteMany();
  .then (() => {
    return Recipe.create({
        'title': 'White Chocolate Brownie',
        'level': 'Amateur Chef',
        'ingredients': ['White chocolate - 200g', 'Flour - 125g', 'Butter - 100g', '2 eggs', 'Vanilla essence - 2 tablespoons'],
        'cuisine': 'American',
        'dishType': 'snack',
        'image': 'https://sugarspunrun.com/wp-content/uploads/2022/09/easy-White-chocolate-Brownies-recipe-5-of-9.jpg',
        'duration': 50,
        'creator': 'Raúl Pérez Sánchez',
        'created': 18
    });
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach((recipe) = console.log(`${recipe.title}'s recipe has been created`));
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese'},
      { duration: 100 }
    );
  })
  .then((recipeUpdated) => {
    console.log(`${recipeUpdated.title}'s recipe has been successfully updated`);
    return Recipe.deleteOne(
      { title: 'Carrot Cake'}
    );
  })
  .then(() => {
    console.log(`The ${recipe.title}'s recipe has been removed form the database`);
  })
  .catch((error) => {
    console.log
  })