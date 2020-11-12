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
    return self.connection.dropDatabase();
  })
  .then((recipe) => {
    console.log(recipe);
  })
  /* return Recipe.insertMany("/data.json");
  })
  .then((recipe) => {
    console.log(recipe);
  }) */
  /*return Recipe.create({
      title: "Pasta carbonara",
      level: "Easy Peasy",
      ingredients: "spaghetti, mushrooms, pancetta, onion, milk, butter",
      cuisine: "Italian",
      dishtype: "main_course",
      image: "https://unaitalianaenlacocina.es/wp-content/uploads/DSC_3862.jpg",
      duration: 30,
      creator: "Italian people",
    });
  })
  .then((recipe) => {
    console.log("This is our new recipe ", recipe);*/

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// mongoose.disconnect()
