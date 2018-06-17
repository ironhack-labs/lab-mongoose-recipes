const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

const recipeSchema = new Schema ({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ["Easy Peasy" , "Amateur Chef", "UltraPro Chef"]},
  ingredients: {type: Array},
  cousine: {type: String, required: true},
  dishType: {type: String, enum:["Breakfast","Dish","Snack","Drink","Dessert","Other"]},
  image: {type: String, default:"https://images.media-allrecipes.com/images/75131.jpg."},
  duration: {type: Number, min:0},
  creator: {type: String},
  created: {type:Date}
})

const Recipe = mongoose.model("Recipe", recipeSchema)

Recipe.collection.drop();

Recipe.create({
  title:"Omelet4",
  level:"Easy Peasy",
  ingredients:["eggs", "milk", "ham","bacon","tomato","onion"],
  cousine:"American",
  dishType:"Breakfast",
  image:"https://www.seriouseats.com/recipes/images/2016/04/20160418-american-omelet-ham-and-cheese-21-1500x1125.jpg",
  duration:0,
  creator:"Me"},
  function (err){
    if(err)console.log(err)
    else console.log("Yay")
  }
)

Recipe.insertMany(data, function (err){
  if(err)console.log(err)
  else data.map(x=>console.log(x.title))
} )

Recipe.updateOne(
  { title: "Rigatoni alla Genovese"}, {duration: 100})
  .then((element) =>{mongoose.connection.close()})

  .catch(function (err){
    console.log(err)
});

Recipe.deleteOne({title: "Carrot Cake"})
  .then(console.log("lol"))

  .catch(function (err){
    console.log(err)
});


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

