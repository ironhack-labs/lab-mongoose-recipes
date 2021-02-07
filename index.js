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
    const ironChicken = {
      title: "Ironhack Beer Glazed Chicken",
      level: "UltraPro Chef",
      ingredients: [
        "At least 5 bottles of beer (for the Chef :) )",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "2 tablespoons Asian chili garlic sauce",
        "salt to taste",
        "8 skinless, boneless chicken breasts"
      ],
      cuisine: "Web Dev",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Bob"
    };

    const createPr = Recipe.create(ironChicken);
    return createPr;
  })
  .then((createdRecipeDocument) => {
    console.log('Recipe.create()', createdRecipeDocument);

    const insertManyPr = Recipe.insertMany(data);
    return insertManyPr;
  })
  .then((createdRecipesArr) => {
    // Print the title of each recipe to the console | i + 1 to avoid the one we created at the 1st iteration
    createdRecipesArr.forEach((recipeDocument, i) => {
      console.log(i + 1, recipeDocument.title);
    })

    const updatePr = Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"}, 
      {$set: {duration: 100}}, // {duration: 100}, it also modifies the duration without the set      
      {new: true}
    );
    return updatePr;
  })
  .then((updatedRecipeDocument) => {
    console.log("UPDATED RECIPE ->", updatedRecipeDocument);

    const deletePr = Recipe.deleteOne(
      {title: "Carrot Cake"}
      );
    return deletePr;
  })
  .then((deleteOneResult) => {
    console.log("DELETED -> ", deleteOneResult);

    const closePr = mongoose.connection.close();
    return closePr;
  })
  .then(() => {
    console.log("DATABASE CLOSED!")
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });