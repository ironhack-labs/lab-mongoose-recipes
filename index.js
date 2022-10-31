import mongoose from 'mongoose';

import Recipe from './src/models/Recipe.model.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("./data.json");

import recipeController from './src/controllers/Recipentes.controller.js';

import * as dotenv from 'dotenv'
dotenv.config()

const MONGODB_URI = `mongodb+srv://amandahp:${process.env.DBPASSWORD}@cluster0.rij7you.mongodb.net/recipes-ironhack`;

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    const recipeDetails = {
      "title": "Asian Glazed Chicken Thighs",
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
    console.log(`Connected to the database: "${x.connection.name}"`);
    const newRecipe = recipeController.createRecipe(recipeDetails);
    console.log(newRecipe.title)

    recipeController.manyRecipes(data).then((d) => {
      d.forEach((val) => {
        console.log(val.title)
      })
    })

    recipeController.updateRecipe({ title: 'Rigatoni alla Genovese', body: { duration: 110 } })

    recipeController.removeRecipe({ title: 'Carrot Cake' })

    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });