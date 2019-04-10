const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require("./models/Recipes")

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  const myRecipe = new Recipe({ 
    title: "",
    cuisine: ""
  });

  myRecipe.save((err) => { if (err) {} else {} });
  
  // Recipe.create(data)
  //   .then((docs) => {
  //     console.log("docs");
  //   })

  Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
    .then(() => {
      console.log("Rigatoni was changed")
    })

  Recipe.deleteOne({title: "Carrot Cake"})
    .then(() => {
      console.log("Carrot Cake was deleted")
    })

    setTimeout(() => {
      mongoose.disconnect()
    }, 2000)