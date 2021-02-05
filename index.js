// IMPORTACIONES

const mongoose  = require('mongoose');
const express   = require('express');
const path      = require('path');
const hbs       = require('hbs');

const app       = express()

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { insertMany, create } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    //return self.connection.dropDatabase();
  })
  
  .then(() => { 
  
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


app.get('/createNew', async () => {
  let recipe = {"title": "Asian Glazed Chicken Thighs",
  "level": "Amateur Chef",
  "ingredients": [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "3 tablespoons minced garlic",
    "salt to taste",
    "8 skinless, boneless chicken thighs"
  ],
  "cuisine": "Asian",
  "dishType": "main_course",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  "duration": 40,
  "creator": "Chef LePapu"
}

let createRecipe = await Recipe.create(recipe)
console.log(createRecipe.title)
  })
  

app.get('/insertMany', async () => {
  let recipes = await Recipe.insertMany(data)
  recipes.map((e) => {
    console.log(e.title)
  })
})

app.get('/updateOne', async () => {
  let updateOne = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
  console.log('succes', updateOne)
})

app.get('/deleteOne', async () => {
  let deleteRecipe = await Recipe.deleteOne({title: 'Carrot Cake'})
  console.log(deleteRecipe)
})

app.listen(3000, () => {
  console.log('Esta conectado')
})
  
  
