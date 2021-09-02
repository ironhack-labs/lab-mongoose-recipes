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
  .then(() => {
    return Recipe.create({
      title: "Lasagne",
      level: "Amateur_Chef",
      ingredients: [
        "meat",
        "onion",
        "garlic",
        "tomatoes",
        "lasagne noodles",
        "cheese",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://www.allrecipes.com/recipe/23600/worlds-best-lasagna/",
      duration: 120,
      creator: "John Chandler",
      created: 2 / 9 / 2021,
    });
  })

  .then(() => {
    return Recipe.insertMany(data);
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    return mongoose.disconnect();
  });
