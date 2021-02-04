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
    const allRecipes = Recipe.insertMany(data);
    return allRecipes;
  })
  .then(() => {
    const updatedRecipe = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },
      { new: true }
    );
    return updatedRecipe;
  })
  .then(() => {
    console.log("YAY you've been updated!");
  })
  .then(() => {
    const delete1 = Recipe.deleteOne({ title: "Carrot Cake" });
    return delete1;
  })
  .then((deletedRecipe) => {
    console.log("Yay you deleted it", deletedRecipe);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

process.on("SIGINT", () => {
  mongoose.connection
    .close()
    .then((data) => console.log("Connection closed"))
    .catch((err) => console.log(err));
});

// ------ Iteration 2  -------- //
// .then(() => {
//  console.log(`"DB Droped!"`);
//     const recipe1 = Recipe.create({
//       title: "Asian Glazed Chicken Thighs",
//       level: "Amateur Chef",
//       ingredients: [
//         "1/2 cup rice vinegar",
//         "5 tablespoons honey",
//         "1/3 cup soy sauce (such as Silver Swan®)",
//         "1/4 cup Asian (toasted) sesame oil",
//         "3 tablespoons Asian chili garlic sauce",
//         "3 tablespoons minced garlic",
//         "salt to taste",
//         "8 skinless, boneless chicken thighs",
//       ],
//       cuisine: "Asian",
//       dishType: "main_course",
//       image:
//         "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
//       duration: 40,
//       creator: "Chef LePapu",
//     });
//     return recipe1;
//   })
//   .then((createdReceipe) => {
//     console.log(createdReceipe.title);
// })
// .then(() => {
//   const title = Recipe.find({}, { title: 1, _id: 0 });
//   return title;
// })
// .then((recipeName) => {
//   console.log(recipeName);
// })
