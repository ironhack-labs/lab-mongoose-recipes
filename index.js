const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const manyTest = [
  {
    title: "Asian Glazed Chicken Thighs",
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
    cuisine: "Asian",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    duration: 40,
    creator: "Chef LePapu",
  },
  {
    title: "Orange and Milk-Braised Pork Carnitas",
    level: "UltraPro Chef",
    ingredients: [
      "3 1/2 pounds boneless pork shoulder, cut into large pieces",
      "1 tablespoon freshly ground black pepper",
      "1 tablespoon kosher salt, or more to taste",
      "2 tablespoons vegetable oil",
      "2 bay leaves",
      "2 teaspoons ground cumin",
      "1 teaspoon dried oregano",
      "1/4 teaspoon cayenne pepper",
      "1 orange, juiced and zested",
    ],
    cuisine: "American",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
    duration: 160,
    creator: "Chef John",
  },
];

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
    // Run your code here, after you have insured that the connection was made

    //ITERATION 2
    // const newRecipe = {
    //   title: "IronHack Pie2",
    //   level: "Easy Peasy",
    //   ingredients: ["Pie", "Pie filling", "Green Vegetables", "Eggs"],
    //   cuisine: "Spanish",
    //   dishType: "main_course",
    //   duration: 60,
    //   creator: "Team1",
    // };

    // Recipe.countDocuments({ title: newRecipe.title })
    //   .then((count) => {
    //     if (count === 0) {
    //       Recipe.create(newRecipe)
    //         .then((recipe) =>
    //           console.log("this is added recipe: " + recipe.title)
    //         )
    //         .catch((error) =>
    //           console.log("An error happened while saving a new recipe:", error)
    //         );
    //     } else {
    //       console.log("recipe already exists");
    //     }
    //   })

    //   .catch((error) => {
    //     console.log(error);
    // });

    //ITERATION 3

    Recipe.insertMany(data, { ordered: false })
      .then((insertedRecipies) => {
        for (let i = 0; i < insertedRecipies.length; i++) {
          console.log("those are the new recipes:" + insertedRecipies[i].title);
        }
        //ITERATION 4 - waiting for all recipies to be added before updating one

        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        )
          .then(() => {
            console.log("Rigatoni has been updated");
          })
          .catch((error) => {
            console.log(error);
          });
      })

      //INSERT MANY CATCH
      .catch((error) => {
        console.log(`this is not working ${error}`);
      });
  }) //CLOSING .THEN AFTER DATABASE HAS CONNECTED

  //CATCH FOR DATABASE CONNECTION FAILURE

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
