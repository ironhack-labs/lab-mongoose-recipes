// jshint esversion:6

const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, // is needed for Iteration 4
});

const promise1 = Recipe.create({
  title: "Hamburger",
  level: "Easy Peasy",
  ingredients: ["ham", "burger"],
  cuisine: "American",
  dishType: "main_course",
  duration: 20,
  creator: "Robert",
});

const promise2 = Recipe.insertMany(data);

// HAS NOT BEEN CHANGED
const promise3 = Recipe.findOneAndUpdate(
  { name: "Rigatoni alla Genovese" },
  { duration: 100 }
);

// HAS NOT BEEN DELETED
const promise4 = Recipe.deleteOne({ name: "Carrot Cake" });

Promise.all([promise1, promise2, promise3, promise4])
  .then((recipes) => {
    console.log("Recipes OK");
    console.log(recipes);
    mongoose.connection.close(() => {
      console.log("connection closed");
    });
  })
  .catch((err) => console.error(err));

//THIS WHOLE THING DOES NOT WORK AT THE END BY CLOSING MONGODB
// .then((self) => {
//   console.log(`Connected to the database: "${self.connection.name}"`);
//   // Before adding any documents to the database, let's delete all previous entries
//   return self.connection.dropDatabase();
// })
// .then(() => {
//   // Run your code here, after you have insured that the connection was made
//   // Iteration 2 - Create a recipe
//   Recipe.create(data[3])
//     .then((recipe) => {
//       console.log(`The recipe ${recipe.title} is created`);
//     })
//     .catch((error) => {
//       console.log("An error happened while creating the recipe: ", error);
//     });
//   // The recipe Rigatoni alla Genovese is created
// })
// .then(() => {
//   // Iteration 3 - Insert multiple recipes
//   Recipe.insertMany(data)
//     .then((recipe) => {
//       //console.log("All the recipes are created ", recipe);
//       recipe.forEach((rec) => {
//         console.log(`recipe ${rec.title} is created`);
//       });
//     })
//     .catch((error) => {
//       console.log("An error happened while creating the recipe ", error);
//     });
// })
// .then(() => {
//   // Iteration 4 - Update recipe
//   Recipe.findOneAndUpdate(
//     { name: "Rigatoni alla Genovese" },
//     { duration: 100 }
//   )
//     .then((recipe) => {
//       console.log(
//         "The duration in your recipe has been successfully updated",
//         recipe
//       );
//     })
//     .catch((error) => {
//       console.log("An error happened while updating the recipe ", error);
//     });
// })
// .then(() => {
//   // Iteration 5 - Remove a recipe
//   Recipe.deleteOne({ name: "Carrot Cake" }, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("The recipe has been successfully deleted");
//     }
//   });
// })
// // .then(() => {
// //   // Iteration 6 - Close the Database // THIS DOES NOT WORK HERE
// //   mongoose.connection.close();
// // })
// .catch((error) => {
//   console.error("There is an error in your latest iteration", error);
// });
// .finally(() => {
//   mongoose.connection.close();
// })
// .finally() DOES NOT WORK

//THIS WHOLE THING DOES NOT WORK AT THE END BY CLOSING MONGODB
// Iteration 2 - Create a recipe
// option 1
// Recipe.create({
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
// })
//   .then((recipe) => {
//     console.log(`The recipe ${recipe.title} is created`);
//   })
//   .catch((error) => {
//     console.log("An error happened while creating the recipe: ", error);
//   });
// Connected to the database: "recipe-app"
// The recipe Asian Glazed Chicken Thighs is created

// option 2
// Recipe.create(data[3])
//   .then((recipe) => {
//     console.log(`The recipe ${recipe.title} is created`);
//   })
//   .catch((error) => {
//     console.log("An error happened while creating the recipe: ", error);
//   });
// The recipe Rigatoni alla Genovese is created

// Iteration 3 - Insert multiple recipes
// Recipe.insertMany(data)
//   .then((recipe) => {
//     //console.log("All the recipes are created ", recipe);
//     recipe.forEach((rec) => {
//       console.log(`recipe ${rec.title} is created`);
//     });
//   })
//   .catch((error) => {
//     console.log("An error happened while creating the recipe ", error);
//   });
// recipe Asian Glazed Chicken Thighs is created
// recipe Orange and Milk-Braised Pork Carnitas is created
// recipe Carrot Cake is created
// recipe Rigatoni alla Genovese is created
// recipe Chocolate Chip Cookies is created

// Iteration 4 - Update recipe
// let query = { name: "Rigatoni alla Genovese" };

// option 1
// Recipe.findOneAndUpdate(query, { duration: 100 })
//   .then((recipe) => {
//     console.log(
//       "The duration in your recipe has been successfully updated",
//       recipe
//     );
//   })
//   .catch((error) => {
//     console.log("An error happened while updating the recipe ", error);
//   });
// The duration in your recipe has been successfully updated null
// BUT THE DURATION STAYS 220 IN MONGODB COMPASS

// option 2
// Recipe.updateOne(
//   { name: "Rigatoni alla Genovese" },
//   { duration: "100" },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Recipe has been successfully updated");
//     }
//   }
// );
// Recipe has been successfully updated
// BUT THE DURATION STAYS 220 IN MONGODB COMPASS

// Iteration 5 - Remove a recipe
// Recipe.deleteOne({ name: "Carrot Cake" }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("The recipe has been successfully deleted");
//   }
// });
