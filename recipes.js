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
  level: {type: String, enum:["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: [],
  cuisine: {type: String, required: true},
  dishType: {type: String, enum:["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: {type:String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type:Number, min: 0},
  creator: String,
  created: {type: Date, default: new Date()}
})

const Recipe = mongoose.model("Recipe", recipeSchema);



// let rice = Recipe.create({
//   title: "Rice", 
//   level: "Easy Peasy", 
//   ingredients: ["rice", "salt"], 
//   cuisine: "Indian", 
//   dishType: "Dish", 
//   duration: 1,
//   creator: "Ziggy the rice burner",
// })
// .catch(err => console.log(err))
// .then(console.log("The recipe is created and is one the DB"));

// console.log(rice);

// Recipe.insertMany(data)
//   .then(console.log(data.length))
//   .catch(err => console.log(err))

// Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
//   .then(console.log("Updated to a 100"))
//   .catch(err => console.log(err));

// Recipe.deleteOne({ title: "Carrot Cake"})
//   .then(console.log("Deleted"))
//   .catch(err => console.log(err));

