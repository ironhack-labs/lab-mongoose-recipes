const mongoose   = require('mongoose');
const dotenv     = require('dotenv');
const express    = require('express');
const hbs        = require('hbs');
const bodyParser = require('body-parser');
const chalk      = require('chalk');

const app = express();

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

require('dotenv').config();

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(chalk.green.inverse(`Connected to the database: "${self.connection.name}"`));
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error(chalk.red('Error connecting to the database', error));
  })
  
  const recipeRicePudding = {
    title: 'Rice Pudding',
    level: 'Easy Peasy',
    ingredients: ['rice', 'milk', 'sugar', 'cinnamon', 'lemon'],
    cuisine: 'yes',
    dishType: 'dessert',
    image: '',
    duration: 20,
    creator: 'Andreu',
    created: ''
  };

  Recipe.create(recipeRicePudding)
    .then((result)=>{
      console.log(`${result.title} has been created`);
      `${result.title}`})
    .catch((error)=>{
      console.log(error)
    })
  
  Recipe.insertMany(data)
    .then((result)=>{
      result.forEach(recipe =>{
        console.log(`${recipe.title}`)
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  
  Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true} )
    .then(()=>{
      console.log("duration success updating!");
    })
    .catch((error)=> {
      console.log(error)
    })
  
  Recipe.deleteOne({title: "Carrot Cake"})
    .then(() => {
      console.log("Success deleting!")
      return mongoose.disconnect(()=>{
        console.log(chalk.red.inverse('Mongoose disconected!'));
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  
  