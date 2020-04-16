const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
// server URI
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
    //iteration 2
    Recipe.create(data[0])
      .then((newRecipe) =>
        console.log(`The ${newRecipe.title} recipe has been added to the Data Base`)
      )
      .catch((err) => console.log(err));

    //iteration 3

    Recipe.insertMany(data)
      .then(() => {
        console.log(`All recipes has been added to the Data Base`);
        ////iteration4
        Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(() => {
          console.log(`The recipe was updated`);
          Recipe.deleteOne({ title: "Carrot Cake" })
            .then(() => {
              console.table(`The recipe was deleted`);
              mongoose.disconnect();
            })
            .catch((err) => console.log(err));
        });

        ////iteration5
      })
      .catch((err) => console.log(err));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
