const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");
const data = require("./data");

const MONGODB_URI = "mongodb://localhost/recipe-app";

const oneRecipe = {
  title: "Pie",
  level: "Easy Peasy",
  ingredients: [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
  ],
  cuisine: "American",
  dishType: "dessert",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 40,
  creator: "Chef Carlos",
};

const manyRecipes = [
  {
    title: "Pie 2",
    level: "Easy Peasy",
    ingredients: [
      "1/2 cup rice vinegar",
      "5 tablespoons honey",
      "1/3 cup soy sauce (such as Silver Swan®)",
      "1/4 cup Asian (toasted) sesame oil",
    ],
    cuisine: "American",
    dishType: "dessert",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 40,
    creator: "Chef Carlos",
  },
  {
    title: "Pie 3",
    level: "Easy Peasy",
    ingredients: [
      "1/2 cup rice vinegar",
      "5 tablespoons honey",
      "1/3 cup soy sauce (such as Silver Swan®)",
      "1/4 cup Asian (toasted) sesame oil",
    ],
    cuisine: "American",
    dishType: "dessert",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 40,
    creator: "Chef Carlos",
  },
  {
    title: "Pie 4",
    level: "Easy Peasy",
    ingredients: [
      "1/2 cup rice vinegar",
      "5 tablespoons honey",
      "1/3 cup soy sauce (such as Silver Swan®)",
      "1/4 cup Asian (toasted) sesame oil",
    ],
    cuisine: "American",
    dishType: "dessert",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 40,
    creator: "Chef Carlos",
  },
];

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // return Recipe.deleteMany();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// Recipe.create(data)
//   .then(() => {
//     console.log("Success adding items");
//   })
// .then(() => {
//   mongoose.disconnect();
// })
//   .catch((error) => {
//     console.log(
//       "Error creating items. Error code:",
//       error.code);
//   });

//ITERATION 2

// Recipe.create(oneRecipe)
//   .then(() => {
//     console.log("Success adding item");
//   })
// .then(() => {
//   mongoose.disconnect();
// })
//   .catch((error) => {
//     console.log(
//       "Error creating item. Error code:",
//       error.code);
//   });

// ITERATION 3

// Recipe.insertMany(manyRecipes)
//   .then((x) => {
//     console.log("Success adding items:");
//     x.forEach((element) => {
//       console.log(element.title);
//     });
//   })
// .then(() => {
//   mongoose.disconnect();
// })
//   .catch((error) => {
//     console.log(
//       "Error creating items. Error code:",
//       error.code);
//   });

// ITERATION 4

// Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
//   .then(() => {
//     console.log("Success changing item");
//   })
// .then(() => {
//   mongoose.disconnect();
// })
//   .catch((error) => {
//     console.log(
//       "Error changing item. Error code:",
//       error.code);
//   });

// ITERATION 5

// Recipe.deleteOne({ title: "Carrot Cake" })
//   .then(() => {
//     console.log("Success erasing item");
//   })
// .then(() => {
//   mongoose.disconnect();
// })
//   .catch((error) => {
//     console.log("Error erasing item. Error code:", error.code);
//   });
