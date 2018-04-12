const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new Schema({
  title: {type: String, required: true},
  level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
  ingredients: {type: []},
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: "April 12 2018"}
});

const Recipe = mongoose.model("Recipe", recipeSchema);

mongoose.connect('mongodb://localhost/recipeApp')
.then(() => {
  console.log('Connected to Mongo!')
}).catch(err => {
  console.error('Error connecting to mongo', err)
});

Recipe.insertMany(data)
.then( (data) => {
  data.forEach( (oneRecipe) => {
    console.log("Recipe :" + oneRecipe.title);
  });
})
.catch( (err) => {
  console.log("ERROR ", err);
});

Recipe.findOneAndUpdate( {title: "Rigatoni alla Genovese"}, {duration: 100} )
.then( (updatedRecipe) => {
  console.log(` The duration of ${updatedRecipe.title} has been updated`);
})
.catch( (err) => {
  console.log("ERROR : the UPDATE has failed", err);
});

Recipe.deleteOne( {title: "Carrot Cake"} )
.then( (deletedRecipe) => {
  console.log(` the recipe has been deleted`);

})
.catch( (err) => {
  console.log("ERROR : the DELETE has failed", err);
});

mongoose.disconnect()
.then( () => {
  console.log("The database is deconnected");
})
.catch( (err) => {
  console.log("ERROR, deconnexion failed", err);
});
