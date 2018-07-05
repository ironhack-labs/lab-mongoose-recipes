const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  //Iteration 1
const RecipeSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: [],
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

// //Iteration 2
// Recipe.create({
//   title: "Cheeseburger",
//   level: "Easy Peasy",
//   ingredients: ["Ground Beef", "Cheese", "Bun", "Pickles", "Onion", "Tomato", "Lettuce"],
//   cousine: "American",
//   dishType: "Dish",
//   image: "https://www.redrobin.com/content/dam/web/menu/gourmet-burgers/gourmet-cheeseburger-1100.jpg",
//   duration: 30,
//   creator: "Chef Curry",
//   created: 1969
//   })
//   .then((res)=>{
//     console.log(res.title);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// //Iteration 3
// Recipe.insertMany(data)
//   .then((res) => {
//     res.forEach((recipe) =>{
//       console.log(recipe.title);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// //Iteration 4
// Recipe.updateOne(
//   {title: "Rigatoni alla Genovese"}, 
//   {duration: 100}
//   )
//   .then((res) => {
//   console.log("Successfully updated", res);
//   })
//   .catch((err) => {
//   console.log(err);
//   });

// //Iteration 5
// Recipe.deleteOne({title: "Carrot Cake"})
//   .then((res) => {
//     console.log("Successfully removed ", res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// //Iteration 6
// setTimeout(() => {
//   mongoose.disconnect()
//   .then(() => {
//     console.log("Disconnected from Mongo!")
//   });
// }, 1000);