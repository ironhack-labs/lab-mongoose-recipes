const mongoose = require('../index');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title : String, required: true,
  level : String, required : ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  ingredients : Array,
  cuisine : String, required : true,
  dishType : String,
  image : String,
  duration : Number,
  creator : String, required : [ "Breakfast", "Dish", "Snack",  "Drink", "Dessert", "Other"],
  created : {type : Date, default : Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

// CREATE A NEW RECIPE
const newRecipe = new Recipe({title : "Ratatouille", level : "Easy Peasy", ingredients : ["tomatoes", "eggplants", "zucchini", "onions"], cuisine : "French", dishType : "Dish", image : "#", duration : 10, creator : "Lison", created : "2019-07-19"})

// ADD NEW RECIPE TO DATA BASE
Recipe.create(newRecipe)
  .then(recipe1 => {
    console.log(recipe1.title)
  })
  .catch(err => {
    console.log(err)
  })

  // UPDATE RECIPE 
Recipe.update({title : 'Rigatoni alla Genovese'}, { $set: {duration : 100}})
.then(recipe2 => {
  console.log("Recipe updated")
})
  .catch((error) => {
    console.log(error)
  })

  // REMOVE 1 RECIPE
Recipe.deleteOne({title : 'Carrot Cake'})
.then(recipe2 => {
  console.log("Recipe removed")
})
  .catch((error) => {
    console.log(error)
  })

  // REMOVE SEVERAL RECIPES 
Recipe.deleteMany({title : 'Ratatouille'})
.then(recipe2 => {
  console.log("Recipes removed")
})
  .catch((error) => {
  console.log(error)
  })
