const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
// New recipe
const newRecipe = new Recipe({
  title: "Gazpacho Andaluz",
  level: "Amateur Chef",
  ingredients: [
    "Tomate pera 1Kg",
    "Pimiento verde 1",
    "Pepino 1",
    "Dientes de ajo 2",
    "Aceite de oliva 50 ml",
    "Pan de Hogaza duro 50g",
    "Agia 250ml",
    "Sal 5g",
    "Vinagre de Jerez 30ml",
  ],
  cuisine: "Spanish",
  dishType: "soup",
  image: "https://i.blogs.es/a8ade0/gazpacho_tradicional/1024_2000.jpg",
  duration: 15,
  creator: "Omonimo",
});

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
    Recipe.create(newRecipe)
      .then((data) =>
        console
          .log("Recipe successfully created! New recipe title:", data.title)
          .then(() => {
            Recipe.insertMany(data).then((data) =>
              data.forEach((recipe) =>
                console.log(
                  "Recipe successfully created! New recipe title:",
                  recipe.title
                )
              )
            );
          })
      )
      .catch((err) => console.log("Error while creating the Recipe"));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
