const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  //Remove everything so you don't have duplicates
  .then(() => {
    Recipe.deleteMany({}, function(err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });
  })
  //Create one Recipe
  .then(() => {
    return Recipe.create({
      title: "Pizza",
      level: "Amateur Chef",
      ingredients: [
        "phone dominos",
      ],
      cuisine: "Italian",
      dishType: "Dish",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
      duration: 30,
      creator: "Chef Dominos"
    });
  })
  //Print in the console the name
  .then(recipe => {
    console.log("Recipe created: ", recipe.title);
    return recipe;
  })
  //Insert all the recipes of the data.js
  .then(() => {
    return Recipe.insertMany(data);
  })
  //Do a Loop to print each title of the recipe
  .then(recipes => {
    recipes.forEach(recipe => console.log(recipe.title));
  })
  //Update the Duration of Rigatoni's
  .then(() => {
    return Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 });
  })
  //Print the notification of update
  .then((recipe) => {
    console.log("Rigatoni's duration updated");
  })
  //Delete Carrot cake recipe
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  //Print the notification of remove 
  .then((recipe) => {
    console.log("Carrot Cake removed");
  })
  //To catch any error with mongo
  .catch(err => {
    console.error("Error connecting to mongo", err);
  })
  //Finally close the BD
  .finally(() => {
    mongoose.connection.close();
  });
