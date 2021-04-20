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
    // Run your code here, after you have insured that the connection was made
  }) // then
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// const recipe1 = new Recipe({
//   title: "Asian Glazed Chicken Thighs",
//   level: "Amateur Chef",
//   ingredients: [
//     "1/2 cup rice vinegar",
//     "5 tablespoons honey",
//     "1/3 cup soy sauce (such as Silver Swan®)",
//     "1/4 cup Asian (toasted) sesame oil",
//     "3 tablespoons Asian chili garlic sauce",
//     "3 tablespoons minced garlic",
//     "salt to taste",
//     "8 skinless, boneless chicken thighs",
//   ],
//   cuisine: "Asian",
//   dishType: "main_course",
//   image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
//   duration: 40,
//   creator: "Chef LePapu",
// });
// console.log(`${recipe1.title}`);
// return recipe1.save();

//------------------------------------------------------------------//

Recipe.create(data)
  .then((Recipe) => console.log("The user is saved and its value is: ", Recipe))
  .catch((error) =>
    console.log("An error happened while saving a new user:", error)
  );
console.log(`${Recipe.title}`);

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then((Recipe) => console.log("Duration updated", Recipe))
  .catch((error) => console.log("Duration Update failed", error));

Recipe.deleteOne({ title: "Carrot Cake" })
  .then((Recipe) => console.log("Deleted", Recipe))
  .catch((error) => console.log("Error occured while deleting", error));
