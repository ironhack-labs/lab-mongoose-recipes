const mongoose = require('mongoose');
const express = require('express')
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.listen(3000, () => console.log('hola'))
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(
      {
        title: "Tumbet Mallorquín",
        level: "Amateur Chef",
        ingredients: [
          "1/2 cup rice vinegar",
          "5 tablespoons honey",
          "1/3 cup soy sauce (such as Silver Swan®)",
          "1/4 cup Asian (toasted) sesame oil",
          "3 tablespoons Asian chili garlic sauce",
          "3 tablespoons minced garlic",
          "salt to taste",
          "8 skinless, boneless chicken thighs"
        ],
        cuisine: "Spanish",
        dishType: "main_course",
        image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        duration: 150,
        creator: "Chef LePapu"
      }
    )
  })
  .then((recipe) => {
    console.log(recipe.title)
    return Recipe.create(data)
  })
  .then((recipes) => {
    recipes.forEach((recipe) => console.log(recipe.title));
    return Recipe.findOneAndUpdate({ "title": "Rigatoni alla Genovese" }, { $set: { "duration": 100 } })

  })
  .then(() => {
    console.log("Se ha cambiado la duración")
    return Recipe.deleteOne({ "title": "Carrot Cake" })
  })
  .then(() => {
    console.log("Se ha eliminado Carrot Cake")
    mongoose.connection.close(console.log("cerramos"));
  })

  .catch(error => {
    console.log('Error connecting to the database', error);
  });