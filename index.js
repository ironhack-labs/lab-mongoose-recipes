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
    //Run your code here, after you have  insured that the connection was made
    const newRecipe = {
      title: "French Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinaigre",
        "5 tablespoons mustard",
        "1/3 cup curry sauce (such as Silver Swan®)",
        "1/4 cup German (toasted) sesame oil",
        "3 tablespoons French chili garlic sauce",
        "3 tablespoons minced oignon",
        "Parsley to taste",
        "8 skinless, boneless chicken thighs",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu",
    };

    console.log(newRecipe.title);

    return Recipe.create(newRecipe);
  })
  .then((bibubbibu) => {
    console.log(bibubbibu);
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach((element) => {
      console.log(element.title);
    });
  })
  .then((aName) => {
    console.log("success");

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("success");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
