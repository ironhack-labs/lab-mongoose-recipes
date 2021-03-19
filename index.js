const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// Iteration 2
const newRecipe = {
  title: "Peanut Butter and Jelly",
  level: "Easy Peasy",
  ingredients: ["peanut butter", "jelly", "bread"],
  cuisine: "American",
  dishType: "snack",
  image:
    "https://www.verywellfit.com/thmb/cefWxbGige9RrMbHiwK38DhPFJo=/2002x2002/smart/filters:no_upscale()/peanut-butter-and-jelly-sandwich-b5f1d5cae12d46c68df3446df000826e.jpg",
  duration: 5,
  creator: "Everybody's mom",
};

Recipe.create(newRecipe)
  .then((recipe) =>
    console.log(`${recipe.title} has been added to the database!`)
  )
  .catch((err) => console.log(err));

// Iteration 3
Recipe.insertMany(data)
  .then((data) => data.forEach((element) => console.log(element.title)))
  .catch((err) => console.log(err));

// Iteration 4
Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then((recipe) =>
    console.log(
      `Success! ${recipe.title} now has a duration of ${recipe.duration} minutes!`
    )
  )
  .catch((err) => console.log(err));

// Iteration 5
Recipe.deleteOne({ title: "Carrot Cake" })
  .then((recipe) => console.log(`${recipe.title} has been removed!`))
  .catch((err) => console.log(err));
