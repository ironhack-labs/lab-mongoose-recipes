const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')
const recipeSchema = new Schema({
  title: {type: String, required: true, unique: true}, 
  level: {type: String, enum:['Easy Peasy','Amateur Chef','UltraPro Chef']},
  ingredients: [],
  cousine: {type: String, required: true},
  dishType: {type: String, enum:['Breakfast','Dish','Snack','Drink','Dessert','Other']},
  image: {type: String, default:'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min:0},
  creator: String,
  created: {type: Date, default: Date.now}
})
const Recipe = mongoose.model('Recipe', recipeSchema);


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
//interation 2
// Recipe.create({title: 'Yumfood3',
// level: 'Easy Peasy',
// cousine: 'Food',
// })
// .then((theRecipe)=>{
// console.log(theRecipe)
// })
// .catch((theError)=>{

// })
// \
// iteration 3
// Recipe.insertMany(data);
// console.log(data);

//Iteration 4 works!

// Recipe.findByIdAndUpdate("5b3e612912750c37f3454a5f", {
//     duration: 100
// })
// .then((response)=>{
//     console.log("YAY! it worked!")
//         console.log(response);
// })
// .catch((err)=>{
//     console.log("NO! it didnt work")
// })

//Iteration 5 remove a recipe Worked!
// Recipe.deleteOne({title:"Carrot Cake"})
// .then((response)=>{
//     console.log("Delete worked")
//     console.log(response);
// })
// .catch((err)=>{
//   console.log("Error in my delete thing")
// })
//iteration 6 don't worry about?