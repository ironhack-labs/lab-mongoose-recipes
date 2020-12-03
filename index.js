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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  });

//  Recipe.create(data[0])
//   .then((recipe) => console.log(recipe.title))
//   .catch((error) =>
//     console.log("An error happened while saving a recipe", error)
//    );

Recipe.insertMany(data)
  .then((recipe) =>
    recipe.forEach((element) => {
      console.log(element.title);
    })
  )
  .catch((error) =>
    console.log("An error happened while saving a recipe", error)
  )

  .then(() => {
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then(console.error("success"))
      .catch((error) => console.log("An error happened", error));
  })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(console.error("success"))
      .catch((error) => console.log("An error happened", error));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
