const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const OneRecipe = {
  title: "Asian Glazed Chicken Thighs",
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
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 40,
  creator: "Chef LePapu",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    // await Recipe.create(OneRecipe)
    // console.log(OneRecipe.title)

    recipesCreated = await Recipe.insertMany(data);
    for (let i = 0; i < data.length; i++) {
      console.log(recipesCreated[i].title);
    }
    recipeUpdated = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    deleteCarrotCake = await Recipe.deleteOne({ title: "Carrot Cake" });

    await mongoose.connection.close();
    console.log('Connection closed.')
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
