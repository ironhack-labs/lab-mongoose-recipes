const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

function addpancakes() {
  let bananaPancakes = {
    title: "bananapancakes",
    ingredients: ["bananas", "pancakes"],
    cusine: "ihop",
    dishType: "breakfast",
    duration: 12,
    creator: "me",
    created: Date.now(),
    level: "Easy Peasy"
  };
  let recipe = new Recipe(bananaPancakes);
  recipe.save();
}

function allform (){
Recipe.insertMany(data)
  .then(data => {
  for(let i =0; i < data.length; i++){
    console.log(data[i].title)
  }
  })
}
console.log(allform())

Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { $set: { duration: 100 } },
  { new: true },
  err => {
    if (err) {
      console.log("Something wrong when updating data!");
    }
  }
);

Recipe.deleteOne({ title: "Carrot Cake" })
.then (successCallBack=>{
  console.log("successCallBack", successCallBack)
})
.catch(errorCallBack => {
  console.log(errorCallBack)
})

