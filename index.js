const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data.json");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipe1 = {
      title: "Test Recipe",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs",
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 10,
      creator: "Test Creator",
    };
    // CREATE
    return Recipe.create(recipe1);
  })
  .then((createdRecipe) => {
    console.log(createdRecipe.title);
  })
  .then(() => {
    const recipes = Recipe.insertMany(data);
    return recipes;
  })
  .then((createdRecipes) => {
    console.log(createdRecipes);
    const pr = Recipe.find({ title: "Rigatoni alla Genovese" });
    return pr;
  })
  .then((updateRecipe) => {
    const pr = Recipe.findByIdAndUpdate(
      updateRecipe[0]._id,
      { duration: 100 },
      { new: true }
    );

    return pr;
  })
  .then((updatedRecipe) => {
    console.log(updatedRecipe);

    //Delete
    const pr = Recipe.deleteOne({ title: "Test Recipe" });
    return pr;
  })
  .then((result) => {
    console.log(`Successful deleted ${result.deletedCount} recipes `);
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('connection closed');
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
