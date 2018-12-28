const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  // receipe-schema (it 1)
  const recipe_schema = new Schema({
    title: {type: String, required: true, unique: true},
    level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
    ingredients: {type: Array},
    cuisine: {type: String, required: true},
    dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
    image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {type: Number, min: 0},
    creator: {type: String},
    created: {type: Date, default: Date.now}
  })

  // receipe-model (it 2)
  const Recipe = mongoose.model("recipe", recipe_schema)
 
  // create a receipe
  // Receipe.create(data[0])
  // .then(receipe => { console.log('The receipe is saved') })
  // .catch(err => { console.log('An error happened') });

  // insert many recipes (it 3)


Recipe.insertMany(data)
  .then(() => {

    Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
    .then(recipe => {
      for (var i = 0; i < data.length; i++){console.log(data[i].title)};
      console.log("edited duration of Rigatoni")})
    .catch(err => {console.log("could not edit duration of Rigatoni");
                   console.log("could not insert all recipes")})
  })
  .then(() => {

    Recipe.deleteOne({title: "Carrot Cake"})
    .then(recipe => {console.log("deleted Carrot Cake");
    mongoose.connection.close()})
    .catch(err => {console.log("could not remove Carrot Cake")})

  })









  

  
  

 