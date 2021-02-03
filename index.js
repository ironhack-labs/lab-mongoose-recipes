const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose.set("useFindAndModify", false);
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
    Recipe.create({
      title: "Spaghetti Cacio e Pepe",
      level: "Easy Peasy",
      ingredients: [
        "1 pound spaguetti",
        "6 tablespoons olive oil",
        "2 cloves garlic, minced",
        "2 teaspoons ground black pepper",
        "1 3/4 cups grated Pecorino Romano cheese",
      ],
      cuisine: "italian",
      dishType: "main_course",
      duration: 23,
      creator: "Barbara Diaz",
      created: new Date("2020-10-13"),
    })
      .then((recipe) => console.log(recipe.title))
      .then(() => {
        Recipe.insertMany(data)
          .then((insertedRecipes) => {
            insertedRecipes.forEach((recipe) => console.log(recipe.title));
          })
          .then(() => {
            Recipe.findOneAndUpdate(
              { title: "Rigatoni alla Genovese" },
              { duration: 100 },
              { new: true }
            ).then((document) =>
              console.log(
                `Recipe ${document.title} duration was successfully updated to ${document.duration} minutes!`
              )
            );
          });
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
