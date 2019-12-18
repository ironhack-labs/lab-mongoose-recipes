const env = require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.js'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
console.log(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}`)
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ironhackcluster-fkeeh.gcp.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    doAllProcesses();
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  function doAllProcesses() {
    createRecipe();
    createManyRecipes();
    updateRecipe();
    deleteRecipe();
    closeDatabase();
  }

  function createRecipe(){
    return Recipe.create({
      title: 'Chocodillas',
      level: 'UltraPro Chef',
      ingredients: ['Quesadillas', 'chocolate', 'pura sazón :v'],
      cuisine: '3 Michelin Stars',
      dishType: 'Other',
      image: 'https://www.santamariaworld.com/optimized/recipe-large/globalassets/_recipes/tex-mex/chocodillas-med-banan.jpg?id=14344',
      duration: 5,
      creator: 'Master Chef Cravioto'
    })
  }

  function createManyRecipes(){
    return Recipe.insertMany(data)
  }

  function closeDatabase(){
    return mongoose.connection.close()
  }

  function updateRecipe(){
    return Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration: 100});
  }

  function deleteRecipe() {
    return Recipe.deleteOne({title: 'Carrot Cake'})
    console.log("Carrot Cake Deleted")
  }