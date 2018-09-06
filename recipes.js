const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
    console.log('===================')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: Array,
  cousine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
}, function(err, recipe) {
  console.log(recipe)
})

var recipes = require('./data')

const Recipe = mongoose.model("Recipe", recipeSchema)


Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 30})
.then((success)=>{
  console.log(success)
})
 .catch((err)=>{
   console.log(err)
 })
// Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 30}, (err, test1)=> {
//   if(err){
//     console.log(err)
//   }else{
//     console.log("=====")
//     console.log(test1)
//   }
// })

Recipe.deleteOne({title: "Carrot Cake"})
.then((success)=>{
  console.log(success)
})
.catch((err)=>{
  console.log(err)
})



Recipe.find({}, (err, allrecipes) => {
  if (err) {
    console.log(err)
  } else {
    allrecipes.forEach(function(recipe) {
      // console.log(recipe)
      console.log(recipe.title)
      console.log(recipe.duration)
    })
  }
})


// Recipe.insertMany(recipes, function(err, rec){
//   if(err){
//     console.log(err)
//   }else{
//     console.log("we just inserted the recipes")
//   }
// })
// Recipe.create({
//   title: "Burgers",
//   level: 'Easy Peasy',
//   ingredients: ['ground beef', 'salt', 'pepper', 'eggs', 'water'],
//   cousine: "fast food",
//   dishType: 'Dish',
//   duration: 30,
//   creator: "Alex R",
//
// }, function(err, recipe){
//   if(err){
//     console.log(err)
//   }else{
//     console.log(recipe)
//   }
// })
