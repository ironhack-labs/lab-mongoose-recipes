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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    Recipe.create({
      title: "Tortillita",
      level: "Easy Peasy",
      ingredients: ["Patatitas", "huevos", "Trufa"],
      cuisisne: "Española",
      dishType: "other",
      creator: "Chef Monti",
    })
      .then((newReceta) => console.log(newReceta))
      .then(() => Recipe.create(data))
      .then((allRecipesCreated) => console.log(allRecipesCreated))
      .then(() =>
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 110 }
        )
      )
      .then((updatedElement) => console.log(updatedElement))
      .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
      .then((removedElement) =>
        console.log("The element was removed correctly")
      )
      .then(() => mongoose.connection.close())
      .catch((err) => console.log("Se ha producido un error:", err));
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
