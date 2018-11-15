const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/recipeSchema.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');

    /*Create one*/ 
    Recipe.create({ 
      title    : "Strange recipe",
      level : `Easy Peasy`,
      ingredients: [`Potatoes`, `Tomato`, `Cheese`, `Apples`],
      cuisine: "Russian",
      dishType:`Other`,
      duration: 30,
      creator: `Anna Zhuravleva`
    })
    .then(recipes => console.log(`The recipe's title is: ${recipes.title}`))
    .catch(err => { console.log('An error happened:', err) });
  
     /*Create many*/
    Recipe.insertMany(data)
    .then(recipes => recipes.forEach(recipe => console.log(`The recipe's title is: ${recipe.title}`)))
    .catch(err => { console.log('An error happened:', err) });

    /**Update */
    Recipe.updateOne({title: "Rigatoni alla Genovese" }, {duration: 30} )
    .then(recipes => console.log(`The recipe has been changed`))
    .catch(err => { console.log('An error happened:', err) });

  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

 
