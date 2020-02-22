const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    console.log("Now insert all data");
    return Recipe.insertMany(data);
  })
  .then(() => {
    console.log("Insert done. Now update bad receipt: ");
    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      {
        duration: 100
      }
    );
  })
  .then(a => {
    console.log("Updated done. Now remove.");
    return Recipe.deleteOne({ title: "Carrot Cake" }, err => {});
  })
  .then(() => {
    console.log("Finish. Closing the database");
    mongoose.connection.close();
  })
  .catch(err => console.error("Error connecting to mongo", err));
