const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String}, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  ingredients: [String],
  cuisine: {type: String, required: true},
  dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Dessert", "Other"]},
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now},
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// CUSTOM RECIPE
let promise1 = Recipe.create({title: "Hoummous", level: "Easy Peasy", cuisine: "Middle-East"});

promise1.then(document => console.log("Recipe added: ", document.title))
  .catch(err => console.log("Something went wrong", err));

// ADD ALL RECIPES
let promise2 = Recipe.insertMany(data);

let updateRigatoni = () => {
  documents => {
    documents.forEach(document => console.log(document.title));
    return Recipe.findOneAndUpdate(
      {title: {$eq: "Rigatoni alla Genovese"}},
      {$set: {duration: 100}})
    .catch(err=>console.log("Update not successfull", err))
  }
}

let deleteCarrot = () => {
  console.log("Rigatoni's duration update was successful");
  return Recipe.deleteOne({title: {$eq: "Carrot Cake"}})
  .catch(err=>console.log("Deletion not successful", err))
}

promise2.catch(err => console.log("Oh boy, what's wrong with you?", err))
  .then(updateRigatoni)
  .then(deleteCarrot)
  .then(() => {
    console.log("Deletion of Carrot Cake was successful");
  })
  .catch(err => console.log("Any of the promises was not successful", err));


Promise.all([promise1, promise2])
  .then(() => mongoose.connection.close)
  .catch(err => console.error(err));