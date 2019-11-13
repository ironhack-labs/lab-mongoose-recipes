const mongoose = require("mongoose"); // Mongoose required
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

mongoose.connection.dropDatabase();

Recipe.create({
  title: "Asian2",
  level: "Amateur Chef",
  ingredients: [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "3 tablespoons minced garlic",
    "salt to taste",
    "8 skinless, boneless chicken thighs"
  ],
  cuisine: "Asian",
  dishType: "Dish",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 40,
  creator: "Chef LePapu"
})
  .then(newRecipe => console.log(`recipe created ${newRecipe.title}`))
  .then(_ => Recipe.insertMany(data))
  .then(allRecipes => { allRecipes.forEach(recipe => console.log("Titolo", recipe.title))})
  .then(_ => Recipe.updateOne ({ title : "Rigatoni alla Genovese" }, { duration : 100 }))
  .then(msg => console.log(msg))
  .then(_ => Recipe.deleteOne({ title: 'Carrot Cake' }))
  .then(msg => console.log(msg))
  .catch(err => console.log(`Error creation of recipe ${err}`))
  .then(mongoose.connection.close())


mongoose.connection.on("connected", () =>
  console.log("Mongoose default connection open")
);
mongoose.connection.on("error", err =>
  console.log(`Mongoose default connection error: ${err}`)
);
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));
process.on('SIGINT', () => { mongoose.connection.close(() => { console.log('Mongoose default connection disconnected through app termination'); process.exit(0); }); });

