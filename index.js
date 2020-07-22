const mongoose = require("mongoose");
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
const patatasBravas = {
  title: "Patatas Bravas",
  level: "Amateur Chef",
  ingredients: ["patatas", "pimenton", "tomate", "cebolla", "sal"],
  cuisine: "Catalana",
  dishType: "other",
  image: "",
  duration: 30,
  creator: "Alejandro and Vic",
};

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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create(patatasBravas)
      .then((newRecipe) =>
        console.log(
          `The title of the recipe is ${patatasBravas.title}`,
          newRecipe
        )
      )
      .catch((error) => {
        console.error("Error creating recipe", error);
      });
  })
  .then(() => {
    Recipe.insertMany(data)
      .then((result) =>
        result.forEach((recipe) => {
          console.log(recipe);
        })
      )
      .catch((err) => console.error("Error insertMany", err));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 },
  { new: true }
)
  .then((recipe) => console.log(recipe.duration))
  .catch((err) => console.log(err));
// Recipe.findOneAndUpdate(
//   { title: "Patatiñas" },
//   {
//     title: "Patatas Bravas",
//     level: "Amateur Chef",
//     ingredients: ["patatas", "pimenton", "tomate", "cebolla", "sal"],
//     cuisine: "Catalana",
//     dishType: "other",
//     image: "",
//     duration: 30,
//     creator: "Alejandro and Vic",
//   },
//   { upsert: true }
// ).then((recipe) => console.log(recipe));
Recipe.deleteOne({ title: "Carrot Cake" })
  .then((recipe) => console.log(recipe.title))
  .catch((err) => console.log(err));

