const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
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
    return Recipe.create(
      {
        title: 'Tortilla de patatas', 
        level: 'Amateur Chef', 
        ingredients: [
          'Patatas', 'Huevos', 'Sal', 'Cebolla', 'Aceite'
        ],
        cuisine: 'Española',
        dishType: 'main_course',
        image: 'https://media.traveler.es/photos/613769f3ccdecaa3de670df4/master/w_1600%2Cc_limit/153119.jpg',
        duration: 60,
        creator:'Joseph de Tena Godoy y Malfeyto',
        created: '1798-02-27'
      }
    )
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {$inc: {duration: -100}})
  })
  .then(() => {
    return console.log('Recipe succesfully updated')
  })
  .then(() => {
    return Recipe.deleteOne(
      { title: "Carrot Cake" }
    )
  })
  .then(() => {
    return console.log('Recipe deleted succesfully')
  })
  .then(() => {
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
