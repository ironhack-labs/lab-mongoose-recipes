const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const app = express();
const bodyParser = require ("body-parser");
app.use(bodyparser.urlencoded({extended:false}));

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  //Create a recipe
var newRecipe = {
  title: "Pasta 'n Stuff",
  level: "Difficult",
  ingredients: ["Pasta", "Other stuff"],
  cuisine: "My type of food",
  dishType: "Yes",
  image: "Nah",
  duration: 5,
  creator: "Me!"
}

app.get("/", (req, res, next) => {

  Recipe.collection.deleteMany({});

  //Insert new recipe
  Recipe.create(newRecipe)
  .then(console.log(newRecipe.title))
  
  //Insert many recipes
  Recipe.insertMany(data)
  .then((recipes)=>{
    for(i=0; i<recipes.length;i++){
      console.log(recipes[i].title)
    }

  //Update one recipe
  Recipe.collection.updateOne(
    {title: "Rigatoni alla Genovese"},
    { $set:{ duration : 100 } }
  )

  //Delete one recipe
  Recipe.collection.deleteOne({title: "Carrot Cake"})

  //Log all recipes
  Recipe.find({})
    .then((recipes)=>{
      console.log(recipes);
      mongoose.connection.close();
    })
  
  })

  // res.render('home', {newRecipe});
  
  
});


app.listen(3000, () => console.log("Connected"))