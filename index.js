const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    //Create a recipe and return new action
    Recipe
    .create({title: 'chicken soup', level: 'Easy Peasy', ingredients: ['chicken', 'onion', 'potato', 'water', 'cilantro', 'love'], cuisine: 'traditional', dishtype: 'soup', image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chicken_soup-4fdd786.jpg', duration: 25, creator: 'Cristian Perdomo', created: '2022-02-02'})
    .then(recipe => {console.log ('Recipe updated', recipe.title)
      return Recipe.insertMany(data)
    })
    //Add recipes from database and return new element to modify
    .then(recipes => {recipes.forEach(elm => console.log(`This is your recipe: ${elm.title}`))
     return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
   })
    //Return the modified object and return new element to modify
    .then(durationChanged => {console.log('Now the duration is', durationChanged.duration)
    return Recipe.deleteOne({title: 'Carrot Cake'}, {new: true})
  })
    //Delete one object and close Mongooses
  .then(deleted => {console.log('The eliminated recipe  is', deleted)
    mongoose.connection.close()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
})

