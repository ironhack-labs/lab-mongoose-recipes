const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const jelloRecipe = {
      title: "Jello Recipe",
      level: "Easy Peasy",
      ingredients: ["cold water", "hot water", "Jello", "Blood"],
      cuisine: "street",
      dishtype: "main_course",
      duration: 5,
      creator: "Jello Mc Jello",
      created: "",
    };

    Recipe.create(jelloRecipe);

    Recipe.insertMany(data);

    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );

    Recipe.deleteOne({ title: "Carrot Cake" });

    mongoose.connection.close(()=> console.log("success"))
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
