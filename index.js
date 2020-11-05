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
    Recipe.create(recipeObj)
      .then((result) => console.log(result.title))
      .catch((err) => console.error(err));
    Recipe.insertMany(data)
      .then((results) =>
        results.forEach((result) => {
          console.log(result.title);
        })
      )
      .catch((err) => console.error(err));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

const recipeObj = {
  title: "Hainanese Chicken Rice",
  level: "Amateur Chef",
  ingredients: [
    "Green onions",
    "500g Chicken Breast",
    "Turmeric",
    "Chopped Ginger",
    "Chopped Garlic",
    "Sriracha or sambal",
    "salt to taste",
    "Sesame oil",
  ],
  cuisine: "Asian",
  dishType: "main_course",
  image:
    "https://steamykitchen.com/wp-content/uploads/2017/09/hainanese-chicken-rice-recipe-9681.jpg",
  duration: 40,
  creator: "Chef in Hainan",
};
