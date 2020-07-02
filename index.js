const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const pancake = {
  title: "Pancakes",
  level: "Easy Peasy",
  ingredients: ["Eggs", "Milk", "Flour", "Sugar"],
  cuisine: "american",
  dishType: "breakfast",
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
    Recipe.create(pancake).then((recipe) => {
      console.log(pancake.title);
      Recipe.insertMany(data).then((dbRes) => {
        data.forEach(function (recipe) {
          console.log(recipe.title);
        });
        Recipe.updateOne(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        ).then((dbRes) => {
          console.log("Updated");
          Recipe.deleteOne({ title: "carrot cake" }).then((dbRes) => {
            console.log("Deleted");
            mongoose.connection.close(function () {
              console.log("Mongoose connection disconnected");
            });
          });
        });
      });
    });
  })
  .catch((error) => {
    console.error(error);
  })
  
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
