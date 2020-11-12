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
    // const recipe = Recipe.create({
    //   title: "Fish pie",
    //   level: "Easy Peasy",
    //   ingredients: [
    //     "Fish filets",
    //     "Potatoes",
    //     "Milk",
    //     "Salt",
    //     "Pepper",
    //     "Butter",
    //     "Cheddar",
    //   ],
    //   cuisine: "International",
    //   dishType: "main_course",
    //   image:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwES3x1LnAtNPusRrU4oIXzTD3B90YSvQZig&usqp=CAU",
    //   duration: 90,
    //   creator: "Ottolenghi",
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

//   In index.js, after the connection to the database has been established, you should add a new recipe document to the database by calling the Model.create static, passing it the recipe details as an object. After inserting the recipe, you should console.log the title of the recipe.

// You can use MongoDB Compass to double check that everything is working as intended.

// To run your code, remember you should use:

// $ node index.js
// Tip: When you have successfully created a new recipe (you see it in the database using Compass tool), you might want to comment out this step. The reason for this is that next time when you run $ node index.js, it will try to create a new recipe with the same name and you will get an error in the terminal related to the duplicate keys - the title should be unique, and the dish with that title already exists in the database.
