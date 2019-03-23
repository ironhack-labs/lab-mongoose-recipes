const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new Schema ({
  title :       {type: String,
                 required: true,
                 unique: true  },
  level:        {type: String,
                 enum: ["Easy Peasy","Amateur Chef", "UltraPro Chef"]},
  ingredients:  {type: Array},
  cuisine:      {type: String, 
                 required: true},
  dishType:     {type: String,
                 enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image:        {type: String,
                 default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration:     {type: Number,
                 min: 0},
  creator:      {type: String},
  created:      {type: Date,
                 default: Date.now()}
        })



mongoose.connect('mongodb://localhost/RecipeApp',{ useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

 const Recipe = mongoose.model('Recipe', recipeSchema);

 Recipe.create({title: "Receta de prueba", cuisine: "pruebas de alta de recetas"})
 .then (recipe => {console.log(recipe.title)})
 .catch (err => {console.log(err)});

 
Recipe.insertMany(data)
.then (recipe => {console.log(recipe.title)})
.catch (err => {console.log(err)});


Recipe.updateOne({title: "Rigatoni alla Genovese"}, {$set:{duration: 100}})
.then (recipe => {console.log(recipe.duration)})
.catch (err => {console.log(err)});

Recipe.remove({title: "Carrot Cake"})
.then (recipe => {console.log(recipe.title)})
.catch (err => {console.log(err)});
