const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  const RecipeSchema = new Schema({
    title: {type: String, required: true, unique: true},
    level: {type: String, enum: ["Easy Peasy","Amateur Chef","UltraPro Chef"]},
    ingredients: {type: []},
    cuisine: {type: String, required: true},
    dishType: {type: String, enum:["Breakfast","Dish","Snack","Drink","Dessert","Other"]},
    image: {type:String, default:"https://images.media-allrecipes.com/images/75131.jpg" },
    duration: {type: Number},
    creator: {type: String},
    created: {type: Date, default: Date.now()}
  });

  const recipe = mongoose.model("recipe",RecipeSchema);
  // module.exports(recipe);

  recipe.create({
    title:"Secret Punch", 
    level: "Easy Peasy",
    ingredients:["Rum","Only Rum, that's the secret!"],
    cuisine: "World",
    dishType: "Drink",
    duration: 10,
    creator: "Alfred Tetzlaff",
    created: "1973-12-31"
  })
  .then(rec => { console.log('The recipe is saved and it is: ', rec) })
  .catch(err => { console.log('An error happened:', err) });

  recipe.insertMany(data)
  .then(
      rec => { 
        console.log('The recipes are saved and they are: ', rec);
        recipe.updateOne({title:"Rigatoni alla Genovese"},{duration:100})
        .then(
          rec => {
            console.log('The recipe has been updated: ', rec);
            recipe.deleteOne({title:"Carrot Cake"})
            .then(
              rec => {
                console.log('The recipe has been removed: ', rec);
                mongoose.disconnect();
              }
            )
            .catch(err => { console.log('An error happened:', err) });
          }
        )
        .catch(err => { console.log('An error happened:', err) }); 
      }
    )
  .catch(err => { console.log('An error happened:', err) });


  

  // setTimeout(function() {mongoose.disconnect()},3000);

