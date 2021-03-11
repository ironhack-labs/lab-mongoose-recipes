const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return self.connection.dropDatabase();
  })
  //Iteration 2
  .then(() =>
    Recipe.create({
      title: "Ola's fav breakfast",
      level: "Easy Peasy",
      ingredients: ["eggs", "leek", "feta", "spinach", "bread", "zatar"],
      cuisine: "Middle Eastern",
      dishType: "breakfast",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 25,
      creator: "Ola",
    })
  )
  .then((myRecipe) => console.log(myRecipe.title))
  //Iteration 3
  .then(() => Recipe.insertMany(data))
  .then(() => Recipe.find({}))
  .then((allRecipies) =>
    allRecipies.forEach((recipe) => console.log(recipe.title))
  )
  //Iteration 4
  .then(() =>
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: "100" },
      { new: true }
    )
  )
  .then(() => console.log("Recipe updated!"))
  //Iteration 5
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(() => console.log("Recipe deleted!"))
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  //Iteration 6 (woohoo!)
  .finally(() => {
    mongoose.disconnect();
  });
