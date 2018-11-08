const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    // unique: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: [String],
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: String,
  created: {
    type: Date,
    default: "2018-11-08",
  },
});


const Recipe = mongoose.model("Recipe", recipeSchema);

// Create a recipe
//----------------------------------------------------------------------

Recipe.create({ title: "Tarte aux pommes", level: "Easy Peasy", cuisine: "French", dishType: "Dessert", duration: 60 })
  .then(recipeDoc => {
    console.log("Recipe CREATE WORKED! 🥞", recipeDoc);
  })
  .catch(err => {
    console.log("Recipe CREATE failed 🦁", err);
  });



// Insert many recipes
//----------------------------------------------------------------------

Recipe.insertMany(data)
  .then(recipeDoc => {
    console.log("All the recipes from data.js have pushed 🥗", recipeDoc);
  })
  .catch(err => {
    console.log("Push the data.js file Failed! 🍎🍐", err);
  });
  

// Update recipe
//----------------------------------------------------------------------

Recipe.findByIdAndUpdate(
  "5be46f950bc40d8e70b38b34",
  { $set: { duration: 100 } }
)
  .then(recipeDoc => {
    console.log(`new duration $set WORKED ${recipeDoc._id}`);
  })
  .catch(err => {
    console.log("New duration $set FAILURE! ⚡️", err);
  });


// Remove a recipe
//----------------------------------------------------------------------

Recipe.findByIdAndRemove("5be46f950bc40d8e70b38b33")
  .then(recipeDoc => {
    console.log(`DELETE (id: ${recipeDoc._id})`);
  })
  .catch(err => {
    console.log("Recipe.findByIdAndRemove() failure 🥒🥦", err);
  });

