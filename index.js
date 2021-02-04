const mongoose = require("mongoose");
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
mongoose.set("useFindAndModify", false);
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
    const recipe = Recipe.create(
      {
        title: "Random recipe",
        level: "Amateur Chef",
        ingredients: [
          "1/2 cup rice vinegar",
          "5 tablespoons honey",
          "1/3 cup soy sauce (such as Silver Swan®)",
          "1/4 cup Asian (toasted) sesame oil",
          "3 tablespoons Asian chili garlic sauce",
          "3 tablespoons minced garlic",
          "salt to taste",
          "8 skinless, boneless chicken thighs",
        ],
        cuisine: "Unknown",
        dishType: "main_course",
        image:
          "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        duration: 40,
        creator: "God",
      },
      (error, recipe) => {
        if (error) {
          console.log("An error occured", error);
          return;
        }
        console.log(recipe.title);
      }
    );
  })
  .then(() => {
    const recipes = Recipe.insertMany(data);
    return recipes;
  })
  .then((recipes) => {
    for (let i = 0; i < recipes.length; i++) {
      console.log(recipes[i].title);
    }
    const pr1 = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
    console.log("Duration successfully changed!");
    return pr1;
  })
  .then(() => {
    const pr2 = Recipe.deleteOne({ title: "Carrot Cake" });
    return pr2;
  })
  .then((pr2) => {
    console.log("Recipe successfuly deleted");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .then(() => {
    mongoose.connection.close();
  });
