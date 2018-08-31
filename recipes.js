const mongoose = require('mongoose');

const Recipe = require("./recipe-model.js");

const Schema   = mongoose.Schema;
const data = require('./data.js')



mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  // Recipe.create({title, level, ingredients, cousine, dishType, image, duration, creator, created})
  // .then(recipeDoc => {
  //   console.log("recipe create SUCCESS!!", recipeDoc)
  // })
  // .catch(err => {
  //   console.log("recipe create FAILURE!! 💩", err);
  // });

Recipe.insertMany(data)
.then((oneRecipe) => {
  console.log(`${oneRecipe.title}`);
})
.catch(err => {
  console.log("recipe insert failed", err);
});

Recipe.findByIdAndUpdate(
  "5b893a3a00c84908efb960e9",
  {$inc: {duration: -120} }
)
.then(recipeDoc =>{
  console.log(`recipe duration update success ${recipeDoc._id}`);
})
.catch(err => {
  console.log("recipe.findByIdAndUpdate() fialure", err);
});

Recipe.findByIdAndRemove("5b893a3a00c84908efb960e8")
.then(recipeDoc => {
  console.log(`DELETED ${recipeDoc.recipeTitle} (id: ${recipeDoc._id})`);
})
.catch(err=> {
  console.log("recipe deletion failed!", err);
});