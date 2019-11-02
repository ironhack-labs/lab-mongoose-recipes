const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });


const recipe = {
  title: "Burritos",
  level: "Easy Peasy",
  ingredients: ["Pepper", "Tomato sauce", "Chicken", "Onion"],
  cuisine: "Mexican",
  dishType: "Dish",
  image:
    "https://cocina-casera.com/mx/wp-content/uploads/2018/08/burrito-alambre-pollo-700x394.jpg",
  duration: 20,
  creator: "Mexican people",
};
Recipe.create(recipe)
.then((recipe) => {
  console.info("**********Iteration 2*********");
  console.info("Recipe created", recipe.title);
  return Recipe.insertMany(data);
})
  .then((recipes) => {
    for (let recipe in recipes) {
      console.info("**********Iteration 3*********");
      console.info("Recipe created", recipe.title);
    }
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },
      { new: true }
    );
  })
  .then((recipe) => {
    console.info("**********Iteration 4*********");
    console.info(`${recipe.title} was updated`);
    return Recipe.deleteOne({
      title: "Carrot Cake"
    });
  })
  .then((recipe) => {
    console.info("**********Iteration 5*********");
    console.info(`${recipe.title} was removed`);
  })
  .then(() => {
    console.info("**********Iteration 6*********");

    console.info("Dropping database");
    return mongoose.connection.dropDatabase();
  })
  .then(() => {
    console.info("Closing database");
    return mongoose.connection.close();
  })
  .catch(error=>
    console.error('There was an error' + error))
