const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost/recipe-app";

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

//Create recipe
function createRecipe(
  title,
  level,
  ingredients,
  cuisine,
  dishType,
  image,
  duration,
  creator,
  created
) {
  Recipe.create({
      title,
      level,
      ingredients,
      cuisine,
      dishType,
      image,
      duration,
      creator,
      created,
    })
    .then((newRecipe) =>
      console.log(`Recipe named ${newRecipe.title} has been created`)
    )
    .catch((err) => console.error(`${err} when creating new recipe`));
}

createRecipe(
  "Traditional Pickles",
  "Amateur Chef",
  ["Pickes", "Mustard Seed", "Vinegar", "Salt", "Water"],
  "American",
  "snack",
  "https://dlife.com/wp-content/uploads/2018/04/Homemade-Pickles-Recipe.jpg",
  15,
  "Ben Balderas"
);