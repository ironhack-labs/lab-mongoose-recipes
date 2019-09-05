const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

const Recipes = require('./models/Recipe');

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    //Recipes.collection.remove();
      console.log("removed all")
    // createRecipe();
    // insertManyRecipe();
    // updateRecipe();
    // deleteOneRecipe();
    closeConnection()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

 

  function createRecipe(){
    Recipes.create({
      title: "Shiro",
      level: "Amateur Chef",
      ingredients: ["powder", "water"],
      cuisine: "berbere",
      dishType: "Dish",
      duration: "30",
      creator: "Me"
    })
    .then(recipe => {
      console.log("Recipe Created", recipe.title);
    })
    .catch(error => {
      console.log("Error creating reciepe", error);
    })
  }

  function insertManyRecipe(){
    Recipes.insertMany(data)   //module.exports
    .then(recipe => {
      console.log("Many recipe inserted");
    })
    .catch(error => {
      console.log("Error inserting reciepe", error);
    })
  }

  function updateRecipe(){
    Recipes.findOne({title: "Rigatoni alla Genovese"})
        .then(recipe => {
            recipe.duration = 100;
            recipe.save()
                .then(() => {
                    console.log("Reciepe duration changed.");
                })
                .catch(error => {
                    console.log("Reciepe duration not changed.");
                });
            console.log("This piece of code is going to run synchronously");    
        })
        .catch(error => {
            console.log("Got an error changing duration");
        });
}

function deleteOneRecipe(){
  Recipes.deleteOne({title: "Carrot Cake"})
    .then(recipe => {
      console.log("Carrot Cake deleted successfully!");
    })
    .catch(error => {
      console.log("Not deleted", error);
    });
  }

  function closeConnection(){
    mongoose.connection.close()
      .then(() =>{
        console.log("Connection closed successfully!");
      })
      .catch(error => {
        console.log("Connection still not closed", error);
      });
  }
  