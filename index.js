const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const recipes = require("./bin/recipes");

const MONGODB_URI = "mongodb://localhost:27017/myrecipes";

const ramenRecipe = {
  title: "Chicken Ramen",
  level: "Amateur Chef",
  cuisine: "Asian",
  dishType: "soup",
  duration: "60",
  creator: "Chef Ichiraku",
  created: Date.today,
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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(recipes).then((res) =>
      console.log(
        res.map((recipe) => {
          return recipe;
        })
      )
    );
    Recipe.create(ramenRecipe).then((res) =>
      console.log(res.title + " inserted successfully.")
    );
    Recipe.insertMany(data).then((res) => {
      console.log(res.map((eachRes) => eachRes.title));
      console.log("Data.json inserted successfully.");
      Recipe.updateOne(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      ).then((res) => console.log(`Recipe was updated successfully.`, res));
      Recipe.deleteOne({ title: "Carrot Cake" }).then((res) =>
        console.log("Recipe deleted successfully", res)
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// mongoose
//   .connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then( async (self) => {
//     console.log(`Connected to the database: "${self.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     await Recipe.deleteMany(); //Clear database
//     await Recipe.create(ramenRecipe);
//     await Recipe.insertMany(data);
//     await Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100})
//     await Recipe.deleteOne({ title: "Carrot Cake"})
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database", error);
//   });
