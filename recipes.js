  //SETTINGS
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  //ITERATION 1 - RECIPE SCHEMA
  const recipeSchema = new Schema ({
    title: String,
    level: {
      type: String,
      enum: ['Easy Peasy', 'Amateur Chef', "UltraPro Chef"], 
    },
    ingredients: [String],
    cuisine: String,
    dishType:{
      type: String,
      enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
    },
    image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {
      type: Number,
      minvalue: 0
    },
    creator: String,
    created: { type: Date, default: 2018-11-11}
  });

  const Recipe = mongoose.model("Recipe", recipeSchema); //model= lien entre collection (ici "Recipe") et le schema de base (ici recipeSchema)

 //ITERATION 2 - CREATE A RECIPE
 let create= 
Recipe.create({title: "Pasta", level: "Easy Peasy", ingredients: ["pasta", "water"]})
.then((recipe)=> {
    console.log(`${recipe.title} is waiting to be cooked!`, recipe)
})
.catch((error)=> {
    console.log("Recipe not created :(!", error)
})

 //ITERATION 3 - INSERT MANY RECIPES
 let insert = 
 Recipe.insertMany(data)
 .then((recipe)=> {
  console.log(`recipe inserted into Recipe Collection`, recipe)
})
.catch((error)=> {
  console.log("recipe NOT inserted into Recipe Collection!", error)
})

 //ITERATION 4 - UPDATE RECIPE
 let update= 
 Recipe.findByIdAndUpdate("5be4680c8e216a1140ca1d84", {set:{$duration:100}})
 .then((recipe)=> {
  console.log(`${recipe.title} now has a duration of 100`, recipe)
})
.catch((error)=> {
  console.log("recipe duration NOT updated!", error)
})

 //ITERATION 5 - REMOVE A RECIPE
 let remove = 
 Recipe.findByIdAndDelete("5be4680c8e216a1140ca1d83")
 .then((recipe)=> {
  console.log(`${recipe.title} has been deleted`, recipe)
})
.catch((error)=> {
  console.log("recipe has NOT been deleted!", error)
})

 //ITERATION 6 - CLOSE THE DATABASE

 Promise.all([create, insert, update, remove])
 .then((recipe)=> {
  mongoose.disconnect();
  console.log(`Connection closed`, recipe)
})
.catch((error)=> {
  console.log("Connection still active", error)
});