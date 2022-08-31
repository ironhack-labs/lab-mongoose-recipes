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
    // return Recipe.create() // pararse sobre esta linea de codigo para ver todo lo que tengo
    // Run your code here, after you have insured that the connection was made
    let myRecipe = new Recipe({
      title: 'milanessa a la parmesana',
      level: 'UltraPro Chef',
      ingredient: ['parmesano', 'powdered bread', 'chicken', 'tomato'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 20,
      creator: 'riki'

    });
    console.error('first recipe', myRecipe);
    return myRecipe.save()
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((recipe) => {
    return console.log(recipe);
    // console.error('otras recipe', recipe)
  })
  .then(() => {
    const updated = Recipe.findOneAndUpdate({ title: { $eq: 'Rigatoni alla Genovese' } },
      { duration: 100 },
      { new: true })
    return updated
  })
  .then(() => {
    const carrotCakeDeleted = Recipe.findOneAndDelete({ title: { $eq: 'Carrot Cake' } })
    return carrotCakeDeleted

  })
  .catch(error => {
    console.error('Error connecting to the database', error);

  })
  .finally(() => {
    mongoose
      .disconnect()
      .then(() => { })
  })


// mongoose.disconnect()






