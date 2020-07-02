const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const myRecipe = {
  title: "whatever",
  level: "Easy Peasy",
  ingredients: ["seeds", "soy", "sugar", "strawberries"],
  cuisine: "korean",
  dishType: "dessert",
};

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

    Recipe.create(myRecipe).then((dbRes) => {
      console.log(myRecipe.title);
      Recipe.insertMany(data).then((dbRes) => {
        data.forEach((recipe) => console.log(recipe.title));
        Recipe.updateOne(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        ).then((dbRes) => {
          console.log("Updated !!", dbRes);
          Recipe.deleteOne({ title: "Carrot Cake" }).then((dbRes) => {
            console.log("Deleted !!", dbRes);
            mongoose.connection.close(() => {
              console.log("Database closed");
            });
          });
        });
      });
    });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
