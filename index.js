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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const newRecipe = {
      title: "Bacalhau",
      level: "Easy Peasy",
      ingredients: ["ovos", "batatas"],
      cuisine: "Portuguesa",
      dishType: "fish",
      image:
        "https://fh-sites.imgix.net/sites/2712/2020/07/16140235/3.-bacalhau-a-bras.jpg?auto=compress%2Cformat&w=1000&h=1000&fit=max",
      duration: 30,
      creator: "chef Antonio",
      created: new Date(),
    };
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(newRecipe);
  })
  .then((createdRecipe) => {
    console.log(createdRecipe);
    const pr = Recipe.insertMany(data);
    return pr;
  })
  .then((manyRecipes) => {
    console.log(manyRecipes);
    const pr = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then(() => {
    const pr = Recipe.deleteOne({ title: "Carrot Cake" });
    return pr;
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("connection closed");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
