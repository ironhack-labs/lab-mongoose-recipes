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

    // Iteration 2 - Create a recipe
    // return Recipe.create({
    //   title: "Asian Glazed Chicken Thighs",
    //   level: "Amateur Chef",
    //   ingredients: [
    //     "1/2 cup rice vinegar",
    //     "5 tablespoons honey",
    //     "1/3 cup soy sauce (such as Silver Swan®)",
    //     "1/4 cup Asian (toasted) sesame oil",
    //     "3 tablespoons Asian chili garlic sauce",
    //     "3 tablespoons minced garlic",
    //     "salt to taste",
    //     "8 skinless, boneless chicken thighs",
    //   ],
    //   cuisine: "Asian",
    //   dishType: "main_course",
    //   image:
    //     "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    //   duration: 40,
    //   creator: "Chef LePapu",
    // });

    // Iteration 3 - Insert multiple recipes
    return Recipe.insertMany(data);
  })
  .then(() => {
    const searchTitles = Recipe.find({}, { title: 1, _id: 0 });
    return searchTitles;
  })
  .then((recipeTitles) => {
    console.log("Here are the titles of the recipes:", recipeTitles);

    // Iteration 4 - Update recipe
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    console.log(
      `SUCCESS: The recipe with title "${updatedRecipe.title}" was updated, duration should now be ${updatedRecipe.duration}.`
    );

    // Iteration 5 - Remove a recipe
    return Recipe.deleteOne({ title: "Carrot Cake" }, { new: true });
  })
  .then(() => {
    const searchTitles = Recipe.find({}, { title: 1, _id: 0 });
    return searchTitles;
  })
  .then((recipeTitles) => {
    console.log(
      "The recipe Carrot cake should no longer be in the list:",
      recipeTitles
    );

    // Iteration 6 - Close the Database
    return mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
