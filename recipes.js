const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

var arr = [...data];
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

mongoose.connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
    return Recipe.collection.drop()
    .catch( err => { console.log('NO EXIST!!', err)})
    .then(() => {console.log('EXSIST!!!')})
  })
  .then(() => {
    return Recipe.insertMany(arr)
  })
  .then(() => {
    console.log("Update Succesfull");
    return Recipe.updateOne({ title: "Rigatoni alla Genovese"},{ duration: 100 })
  })
  .then(() => {
    return Recipe.deleteOne({ title:"Carrot Cake"})
  })
  .then(() => {
    console.log('Recipe Deleted!!!')
    return mongoose.disconnect();
  })
  .then(() => 
    console.log('Disconect')
  )
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });


