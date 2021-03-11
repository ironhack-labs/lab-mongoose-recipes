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
    return Recipe.create({
      title: "Lasagne",
      level: "UltraPro Chef",
      ingredients: [
        "tomatoe",
        "pasta",
        "ricotta",
        "parmezan",
        "basil",
        "garlic",
      ],
      cuisine: "itailan",
      dishType: "main_course",
      image:
        "https://www.rozkoszny.pl/wp-content/uploads/2020/05/DSC06791-%C5%9Aredni-683x1024.jpg.webp",
      duration: 120,
      creator: "Aleksandra & Aldo",
      created: Date.now(),
    });
  })
  .then((recipe) => {
    console.log("Recipe added successfully!", recipe);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
