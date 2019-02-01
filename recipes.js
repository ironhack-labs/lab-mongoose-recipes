const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require("./models/recipe-model.js");

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


// Recipe.create({ title: "Pesto sauce", cuisine: "Tout mixer et VOILÀ" })
//   .then(recipeNew => {
//     console.log(`Pesto sauce CREAT success 🥦`, recipeNew);
//   })
//   .catch(err => {
//     console.log(`Pesto sauce CREAT failure 💥`, err);
//   });


Recipe.insertMany(data)
  .then(recipesData => {
    recipesData.forEach(recipeTitle => {
      console.log(
        `One recipe title is ${recipeTitle.title}✨`)
    });
  })
  .catch(err => {
    console.log(`insertMany() CREAT failure 🔥`, err);
  }); 


Recipe.findOneAndUpdate(
  { title: { $eq: "Rigatoni alla Genovese" } },
  { duration: 100 }
)
  .then(newDuration => {
    console.log(`findOneAndUpdate() SUCCESS`);
  })
  .catch(err => {
    console.log(`findOneAndUpdate() FAILURE`, err);
  });


Recipe.findOneAndRemove({ title: { $eq: "Carrot Cake" } })
  .then(oneDelete => {
    console.log(`findOneAndRemove() SUCCESS`);
  })
  .catch(err => {
    console.log(`findOneAndRemove() FAILURE`, err);
  });