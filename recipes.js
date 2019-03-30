const Recipe = require('./models/recipe.model');
const recipes = require('./data.js');
const mongoose = require('mongoose');

require('./config/db.config');

const newRecipe =  {
  title: 'Brownies',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup butter', '1 cup sugar', '2 eggs', '2 teaspoon vanilla extract', '3/4 cup flour', '1/3 cup cocoa powder', '1/4 teaspoon salt', '1/4 teaspoon baking powder', '1 cup chocolate chips', '2/3 cup chopped nuts'],
  cuisine: 'American',
  dishType: ['Dessert'],
  image: 'https://unsplash.com/photos/WPRuXYLNY68',
  duration: 60,
  creator: 'Chef Awesome'
}

const updateDuration = 100;
const removeRecipe = 'Carrot Cake';


Recipe.create(recipes)
  .then((newRecipe) => {
    console.info('============')
    console.info('Creating new recipe', newRecipe.title)
    return Recipe.insertMany({ recipes })
    .save()
      .then(newRecipe => console.info('Recipe Successfully Created', newRecipe.title))

  })
  .then(() => {
    console.info('Updating recipe', updateDuration)
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' },{ $set: {duration: 100 }}, { new: true })
      .then(recipe => { console.info(`${recipe.title} Successfully Updated`)})
  })
  .then(() => {
    console.info('Removing recipe', removeRecipe)
    return Recipe.remove({ title: removeRecipe})
    .then(recipe => { console.info(`${recipe.title} Successfully Updated`)})  
  })
  .catch(error => console.error(error))
  
  .then(() => {
    console.info('Dropping database!')
    return mongoose.connection.dropDatabase()
  })
  .then(() => {
    console.info('Disconnecting...')
    return mongoose.disconnect()
  })
  .then(() => console.info('Successfully disconnected, bye!'))