const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    const recipeDetails = {
      title: " Soup",
      level: "Easy Peasy",
      ingredients: [
        "1 tbsp butter",
        "2 garlic cloves",
        "1 shallot",
        "2 broccoli heads",
        "1/2 tsp black pepper",
        "2 1/2 cups vegetable stock",
      ],
      cuisine: "soup",
      dishType: "soup",
      image:
        "https://www.notenoughcinnamon.com/wp-content/uploads/2014/02/Simple-Broccoli-Soup-NotEnoughCinnamon.com1_.jpg",
      duration: 20,
      creator: "Majid",
      created: new Date(),
    };
    return Recipe.create(recipeDetails);
  })
  .then((response) => {
    console.log(response.title);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((response) => {
    response.forEach((recipe) => {
      console.log(recipe.title);
    });
  })
  .then(() => {
    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: 100 };
    return Recipe.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });
  })
  .then((response) => {
    console.log("Recipe is now updated:");
    console.log(response);
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((response) => {
    console.log("Recipe delete attempt:");
    console.log(response);
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error: ", error);
  });