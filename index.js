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
    return mongoose.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    return Recipe.create({
      title: "Fish n Chips",
      level: "Expert(if you are not British)",
      ingredients: ["fish", "chips"],
      cuisine: "British",
      dishType: "food",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Fish_and_chips_blackpool.jpg/1920px-Fish_and_chips_blackpool.jpg",
      duration: 10,
      creator: "Chris (the English gentleman) Toth",
      created: new Date(),
    });
  })
  .then((createdRecipe) => {
    console.log(createdRecipe.title);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((manyRecipes) => {
    console.log(manyRecipes);
    // should i use a map here or query the database?
    let titles = manyRecipes.map(function (recipe) {
      return recipe.title;
    });
    console.log(titles);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    return mongoose.disconnect();
  });
