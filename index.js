const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      title: 'Chicken Parmi',
      level: 'Amateur Chef',
      ingredients: ['Chicken Breast', 'Bread Crumbs', 'Egg', 'Ham', 'Cheese', 'Tomato Puree', 'Garlic'],
      cuisine: 'Australian Pub',
      dishType: 'main_course',
      image: 'recipes-chickenparmi.jpg',
      duration: 60,
      creator: 'Matt Hamilton'
  })
  }) 
  .then((recipe) => {
    console.log(recipe.title)
  })

  .then((crocodile) => {
    return Recipe.insertMany(data)
  })

  .then((crocodile) => {
    return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100})
  })
  .then(() => {
    console.log('SUCCESS')
  })

  .then(() => {
    return Recipe.deleteOne({title:'Carrot Cake'})
  })
  .then(() => {
    console.log('SUCCESS!!!!')
  })

  .then(() => {
    mongoose.disconnect();
  })

  .then(() => {
    console.log('we disconnected')
  })

  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

