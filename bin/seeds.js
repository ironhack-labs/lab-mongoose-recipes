const mongoose = require("mongoose");
require("../config/db.config");
const recipes = require('../data.json')


const Recipe = require("../models/recipe.model");

mongoose.connection
  .dropDatabase()
  .then(() => {
    Recipe.create(recipes)
    .then((recipes) => {
      Recipe.create(
      { 
      title:"arroz con leche",
      level:"Easy Peasy",
      ingredients:"arroz, leche, más cositas",
      cuisine:"tradcional",
      dishType: "dessert", 
      duration: 3,
      creator: "vero y luis",
       })
      }) 
   .then((recipes) => {
    Recipe.insertMany(
    
      {
        title: "Orange and Milk-Braised Pork Carnitas dos",
        level: "UltraPro Chef",
        ingredients: [
          "3 1/2 pounds boneless pork shoulder, cut into large pieces",
          "1 tablespoon freshly ground black pepper",
          "1 tablespoon kosher salt, or more to taste",
          "2 tablespoons vegetable oil",
          "2 bay leaves",
          "2 teaspoons ground cumin",
          "1 teaspoon dried oregano",
          "1/4 teaspoon cayenne pepper",
          "1 orange, juiced and zested"
        ],
        cuisine: "American",
        dishType: "main_course",
        image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
        duration: 160,
        creator: "Chef John"
      },
      {
        title: "Carrot Cake con un cambio",
        level: "Amateur Chef",
        ingredients: [
          "6 cups grated carrots",
          "1 cup brown sugar",
          "1 cup raisins",
          "4 eggs",
          "1 1/2 cups white sugar",
          "1 cup vegetable oil",
          "2 teaspoons vanilla extract",
          "1 cup crushed pineapple, drained",
          "3 cups all-purpose flour",
          "1 1/2 teaspoons baking soda",
          "1 teaspoon salt",
          "4 teaspoons ground cinnamon"
        ],
        cuisine: "International",
        dishType: "dessert",
        image: "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
        duration: 130,
        creator: "Chef Nadia"
      },
    )
   }) 
   .then((recipes) => {
    Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese" }, {$set: {duration:100}}
    )
   })

   .then((recipes) => {
    Recipe.deleteOne(
      {title:"Carrot Cake"}
    )
   })
    
  })