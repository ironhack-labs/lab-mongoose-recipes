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
    // Iteration 2
    // const recipeOne = {
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
    //   image:
    //     "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    //   duration: 40,
    //   creator: "Chef LePapu",
    //   created: "2021-09-29T17:30:00.000+00:00",
    // };
    // return Recipe.create(recipeOne);

    return Recipe.insertMany(data);
  })
  .then((recipesfromDB) => {
    // Iteration 3
    // recipesfromDB.forEach((recipe) => console.log(recipe.title));

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { returnDocument: "after" }
    );
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((response) => {
    if (response.deletedCount > 0) {
      console.log("Recipe successfully deleted");
    } else {
      console.log("There was a problem");
    }
    console.log("1", mongoose.connection);
    mongoose.connection.close();
    console.log("2", mongoose.connection);
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
