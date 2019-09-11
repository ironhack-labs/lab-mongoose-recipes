const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });


Recipe.create({
  title: "Fabada seca",
  level: "Easy Peasy",
  ingredients: ["Beans", "Morcilla"],
  cuisine: "Slowly",
  dishType: "Breakfast",
  duration: 120,
  creator: "Borja",
}).then(() => {
  console.log("created");
  Recipe.insertMany(data).then(() => {
    console.log(data);
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then(() => {
      console.log("updated");
      Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
        console.log("deleted");
        mongoose.connection.close();
      });
    });
  });
});