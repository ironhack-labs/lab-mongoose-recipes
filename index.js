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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create({
      title: "Broccoli Salad",
      level: "Easy Peasy",
      ingredients: [
        "broccoli",
        "apple",
        "red pepper",
        "olive oil",
        "vinegar",
        "pine nuts",
        "honey",
        "mustard",
        "salt",
        "pepper",
      ],
      cuisine: "German",
      dishType: "main_course",
      duration: 20,
      creator: "Chef Sophie",
    });
  })
  .then((createdRecipe) => {
    console.log("My created recipe:", createdRecipe.title);
    return Recipe.insertMany(data);
  })

  .then((insertedRecipe) => {
    console.log("Collection with old and inserted Recipes:", insertedRecipe); // insertedRecipe.title >> undefined
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })

  .then((updatedRecipe) => {
    console.log(
      "The updated Rigatoni alla Genovese (new Duration)",
      updatedRecipe
    );
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })

  .then((deletedRecipe) => {
    console.log("The deleted Recipe", deletedRecipe);
    return mongoose.disconnect(); // Terminates the connection between mongoose and our database
  })
  .then(() => {
    console.log("Mongoose is now disconnected from our database in MongoDB.");
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
