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
    // Run your code here, after you have insured that the connection was made

    const recipeSchema = new Recipe({

      title: 'patatas bravas',
      level: 'Easy Peasy',
      ingredients: 'patatas y salsa brava',
      cuisine: 'spanish',
      dishType: 'snack',
      image: '',
      duration: 15,
      creator: 'chef Pepe',
      created: '2021-10-10'
    });

    return recipeSchema.save()
  })
  .then(() => {
    return Recipe.insertMany(data)
      .then(() => {
        return Recipe.findOneAndUpdate({ title: { $eq: "Rigatoni alla Genovese" } }, { duration: 100 }, { new: true })
      })
      .then(() => {
        return Recipe.findOneAndDelete({ title: { $eq: 'Carrot Cake' } })
      })
      .catch((err) => {
        console.log(err);
      });
  }).finally(() => {
    mongoose
      .disconnect()
      .then(() => { })
  })


mongoose.disconnect()