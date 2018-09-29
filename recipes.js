const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const Recipe = require("./models/Recipe");

const newRecipe = {
  title: "Sopa",
  level: "Easy Peasy",
  ingredients: ["Tomatoe", "Salt", "Onion"],
  cousine: "mexican",
  dishType: "Dish",
  duration: 10,
  creator: "Peter Cruz"
};

const recipes = [
  {
    title: "Pasta",
    level: "Amateur Chef",
    ingredients: ["Bread", "Salt", "Carrot"],
    cousine: "mexican",
    dishType: "Breakfast",
    duration: 45,
    creator: "Peter Cruz"
  },
  {
    title: "Juice",
    level: "UltraPro Chef",
    ingredients: ["sausage", "lemon", "orange"],
    cousine: "germany",
    dishType: "Snack",
    duration: 60,
    creator: "Peter Cruz"
  },
  {
    title: "Hot Cakes",
    level: "Easy Peasy",
    ingredients: ["Eggs", "Butter", "Flour"],
    cousine: "mexican",
    dishType: "Dessert",
    duration: 30,
    creator: "Peter Cruz"
  },
  {
    title: "Rigatoni alla Genovese",
    level: "UltraPro Chef",
    ingredients: ["rigatoni", "lemon", "orange"],
    cousine: "germany",
    dishType: "Breakfast",
    duration: 45,
    creator: "Peter Cruz"
  },
  {
    title: "Sandwich",
    level: "Amateur Chef",
    ingredients: ["Sausage", "Peper", "Cake"],
    cousine: "mexican",
    dishType: "Snack",
    duration: 25,
    creator: "Peter Cruz"
  }
];

function create(item) {
  Recipe.create(item)
    .then(item => {
      console.log(`Created: ${item.title}`);
    })
    .catch(err => {
      console.log("Error: ", err);
    });
}

function createMany(items) {
  Recipe.insertMany(items)
    .then(recipes => {
      recipes.forEach(recipe => {
        console.log(`Created: ${recipe.title}`);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

function updateRecipe(title, data) {
  Recipe.updateOne({ title: title }, data)
    .then(resp => {
      console.log(`Correctly!!`);
    })
    .catch(error => {
      console.log(error);
    });
}

function removeRecipe(title) {
  Recipe.deleteOne({ title: title })
    .then(res => {
      console.log(`Correctly!!`);
    })
    .catch(error => {
      console.log(error);
    });
}

create(newRecipe);
createMany(recipes);
updateRecipe("Rigatoni alla Genovese", { duration: 100 });
removeRecipe('Carrot Cake');

process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 