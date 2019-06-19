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

function createrecipe() {
  Recipe.create({
    title: "pizza",
    level: "Easy Peasy",
    cuisine: "italy",
    dishType: "Dish",
    duration: 26,
    creator: "souhair"
  }).then(res => {
    console.log("title");
  });
}
// createrecipe();

// Recipe.insertMany(data, function(err, docs) {});

// Recipe.findByIdAndUpdate({ _id: "5d0a4e15c4da401008d73945" }, { duration: 100 })
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// Recipe.findByIdAndRemove("5d0a4e15c4da401008d73944")
//   .then(res => console.log(res))
//   .catch(res => console.log(res));

//vu que c'est asynchrone, il faut soit faire Promise.All (regarder la doc ) ou en attendant décommenter tout le code.

mongoose.connection.close();
