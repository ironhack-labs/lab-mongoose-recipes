// EXERCISE SETUP
const express = require("express");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/recipe-model.js');


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// JULES SETUP

const app = express();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");



app.listen(5555, () => {
  console.log("food server ready 🍗");
});



// ROUTES
//-----------------------------------------------
//===============================================


app.get("/", (request, response, next) => {
  Recipe.find({
      title: {
        $eq: 'Soufflet au fromage'
      }
    })
    .then(recipeResult => {
      response.locals.recipeList = recipeResult;
      response.render("index.hbs");


    })
    .catch(err => {
      console.log('HOME PAGE Dog.find() failled', err);
    })

});


// DB WORKS
//-----------------------------------------------
//===============================================

//iteration 2
//-----------------------------------------------
Recipe.create({
    title: 'Soufflet au fromage',
    level: 'Amateur Chef',
    ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
    cuisine: 'french',
    dishType: ['Dish'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 40,
    creator: 'Chef Bibi'
  })
  .then(recipeOk => {
    console.log(`recipe.create id working 🍕`, recipeOk);
  })
  .catch(err => {
    console.log("recipe.create faillure 💩", err)
  });


//iteration 3
//-----------------------------------------------


Recipe.insertMany(data)
  .then(insertOk => {
    insertOk.forEach(function (item) {
      console.log(`${item.title}`)
    })
    console.log("insertMany OK")
  })
  .catch(err => {
    console.log('insertMany does not work', err);
  });


//iteration 4
//-----------------------------------------------

Recipe.findByIdAndUpdate("5c545422a84b35f4ec4691a4", {
    $set: {
      duration: 100,
    }
  })
  .then(updateOk => {
    console.log(`Update duration OK ${updateOk.duration}`)

  })
  .catch(err => {
    console.log('update duration failled', err)
  });

//iteration 5
//-----------------------------------------------

Recipe.findByIdAndRemove("5c545422a84b35f4ec4691a3")
  .then(deletOk => {
    if (deletOk) {
      console.log(`DELETED ${deletOK.title} (id: ${deletOK._id}) ❌`);
    } else {
      console.log("couldn't find anything to REMOVE");
    }
  })
  .catch(err => {
    console.log("Recipe removal Faillure", err);
  });

//iteration 5
//-----------------------------------------------

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});