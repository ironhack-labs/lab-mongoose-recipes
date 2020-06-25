const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect("mongodb://localhost/Recipes", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({
      title: "Cherry Tiramisu",
      cuisine: "Italian",
      duration: 60,
    }).then((recipe) => {
      console.log(recipe.title);
    });
    Recipe.insertMany(data).then((el) => {
      el.forEach((recipe) => console.log(recipe.title));
      const filter = { title: "Rigatoni alla Genovese" };
      const update = { duration: 100 };
      const promise1 = Recipe.findOneAndUpdate(filter, update, {
        new: true,
      }).then(console.log("Updated duration of Rigatoni alla Genovese recipe"));
      const promise2 = Recipe.deleteOne({ title: "Carrot Cake" }).then(
        console.log("Deleted Carrot Cake recipe")
      );
      Promise.all([promise1, promise2]).then(() => {
        console.log('All commands executed successfully. Closing database connection now...');
        mongoose.connection.close();
      });
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
