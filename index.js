const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost/recipe-app";

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
    Recipe.create({
      title: "Tuc au bacon",
      level: "Easy Peasy",
      ingredients: ["eggs", "flour", "bacon", "salt", "oil"],
      cuisine: "Junk food",
      dishType: "snack",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 50,
      creator: "Mondelez",
    })
      .then((recipe) => {
        console.log(recipe.title);
      })
      .catch((err) => {
        console.log(err);
      });

    Recipe.insertMany(data)
      .then((data) => console.log("All recipes are in db"))
      .catch((err) => console.log(err));

    Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese"}, {duration: 100})
      .then((recipe) => {
        console.log("Rigatoni updated");
      })
      .catch((err) => {
        console.log(err);
      });

    Recipe.deleteOne({ title: "Carrot Cake" })
      .then((message) => {
        console.log("The bunny ate all the carrot cake :(");
      })
      .catch((err) => console.log(err));
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
