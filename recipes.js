const express = require("express");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')
const Recipe = require("./models/Recipe")


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


const app = express()


app.get("/create-recipe", (req, res) => {
  const myRecipe = new Recipe({
    level: "Easy Peasy",
    ingredients: ["Spagetti", "Tomatoes", "Meat", "Pepper"],
    cousine: "italian",
    dishType: "Dish",
    duration: 60,
    creator: "Italian guy",

  })

  myRecipe.save().then(result => {
    console.log(result)
    res.send("Recipe created")
  }).catch(console.error)


})



app.get("/load-data", (req, res) => {
  Recipe.insertMany(data)
    .then(result => result.forEach(r => { Recipe.save(r) }))
    .catch(console.error)
})

app.get("/update", (req, res) => {

  Recipe.where({ title: "Rigatoni alla Genovese" }).update({ title: 'Rigatoni alla Genovese' }, { duration: 100 }).then(result => {
    res.send("Success")
  })
})


app.get("/delete", (req, res) => {

  Recipe.remove({ title: 'Carrot Cake' })
    .then(result => {
      res.send('Removed!')
    })
    .then(result => {
      mongoose.connection.close().then(console.log('closed'))
    })
    .catch(err => {
      console.log(err)
    })

})







app.listen(3000)