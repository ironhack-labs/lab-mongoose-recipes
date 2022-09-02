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
    return Recipe.deleteMany()
  })
  .then(() => {
    const recipeSchema = new Recipe({
      'title': 'Scampy Fries',
      'level': 'Easy Peasy',
      'ingredients': 'delicious savoury scampi and lemon crisp snack',
      'cuisine': 'Asian',
      'dishType': 'snack',
      'image': '',
      'duration': 40,
      'creator': "Smith's"
    });
    return recipeSchema.save();
  })
  .then(() => {
    return Recipe.insertMany(data) 
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: {$eq: 'Rigatoni alla Genovese'} }, {duration: 100}, {new: true})
  })
  .then(() => {
    return Recipe.findOneAndDelete({ title: {$eq: 'Carrot Cake'} })
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => { mongoose.disconnect() })