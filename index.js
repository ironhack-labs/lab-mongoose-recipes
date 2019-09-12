const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from "./models/Recipe"
const data = require("./data.js");  // Import of the data from "./data.js"
// Connection to the database “recipeApp”
mongoose.connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
.then(() => {
  console.log("Connected to Mongo!");
}).catch(err => {
  console.error("Error connecting to mongo", err);
});
//  let bananaPancakes = {
//    title: "BATMAN PANCAKES",
//    ingredients:["bananas", "pancakes"],
//  }
//  let bananaRecipe = new Recipe(bananaPancakes)
//  bananaRecipe.save()
let recipes = function(){
  for(i = 0; i<data.length; i++){
    let myRecipe = {
      title:data[i].title,
      ingredients:data[i].ingredients,
      cuisine: data[i].cuisine,
      dishType:data[i].dish,
      image:data[i].image,
      duration:data[i].duration,
      creator:data[i].creator,
    }
    let recipe = new Recipe(myRecipe)
    recipe.save()
  }
}
//  recipes()
Recipe.findOne({title: "Rigatoni alla Genovese"})
.then(recipe=>{
 {recipe.duration = 160}
 console.log("Success!")
 recipe.save()
})