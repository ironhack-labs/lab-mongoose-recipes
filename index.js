const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

Recipe.create({
  title: "baodslkfhj",
  level: "Easy Peasy",
  ingredients: ["eggs", "butter", "mayonnaise"],
  cuisine: "thai",
  dishType: "Dish",
  image: "#",
  duration: 120,
  creator: "mr propre",
  created: new Date()
})
  .then(arg => {
    console.log("created recipe!");
  })
  .catch(err => {
    console.error("no recipe", err);
  });

// const promise1 = Recipe.insertMany(data)
// promise1.all()

Recipe.insertMany(data)
  .then(arg => {
    console.log("created recipes!");
  })
  .catch(err => {
    console.error("no recipe", err);
  });

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(arg => {
    console.log("updated success");
  })
  .catch(err => {
    console.error("no update", err);
  });

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(arg => {
    console.log("delete success");
  })
  .catch(err => {
    console.error("no delete", err);
  });

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })

  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
