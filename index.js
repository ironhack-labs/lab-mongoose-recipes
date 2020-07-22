const process = require("process");
const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const recipeMocks = require("./data");

const chickenRecipe = {
  title: "Asian Glazed Chicken Thighs II",
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
    Recipe.deleteMany({});
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create(chickenRecipe).then((recipeInDB) =>
      console.log(`${recipeInDB.title} just added to the database`)
    );
  })
  .then(() => {
    Recipe.insertMany(recipeMocks)
      .then((recipesInDB) => {
        recipesInDB.forEach((recipe) => {
          console.log(`${recipe.title} just added to the database`);
        });
      })
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { useFindAndModify: false }
        ).then((updatedRecipe) =>
          console.log(
            `Duration of ${updatedRecipe.title} was updated to ${updatedRecipe.duration}`
          )
        );
      })
      .then(() => {
        Recipe.deleteOne({ title: "Carrot Cake" }).then((deletedRecipe) =>
          console.log("Deleted", deletedRecipe)
        );
      });
  })
  .catch((err) => console.log(`Error ${err} adding recipe to the DB`));

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
