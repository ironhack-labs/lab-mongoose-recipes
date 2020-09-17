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
    Recipe.create({
      title: "Moelleux au chocolat",
      level: "Easy Peasy",
      ingredients: ["eggs", "chocolate", "flour"],
      cuisine: "french",
      dishType: "dessert",
      duration: 30,
      creator: "Lisa",
    }).then((newRecipe) => {
      console.log(newRecipe);
      Recipe.insertMany(data)
        .then((allRecipes) => allRecipes.forEach((recipe) => console.log(recipe.title)))
        .then(() => {
          Recipe.findOneAndUpdate(
            { title: "Rigatoni alla Genovese" },
            { duration: 100 },
            { new: true }
          )
            .then(console.log("Rigatoni recipe successfuly updated!"))
            .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
            .then(console.log("Carrot Cake removed"))
            .then(() => mongoose.connection.close())
            .then(console.log("connexion closed"));
        });
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
