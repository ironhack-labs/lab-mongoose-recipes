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
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error("Error connecting to mongo", err));

Recipe.deleteMany(data)
  .then(result => {
    console.log(result + "db closed");
  })
  .catch(error => {
    console.log(error);
  });

Recipe.create({ title: "testrecipe", cuisine: "testcuisine" })
  .then(createdUser => {
    console.log(createdUser);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.insertMany(data, (error, user) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("all good in the hood", data);
});

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(result => {
    console.log("Update was a succes" + result);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.deleteOne({ title: "Carrot Cake" }).then(result => {
  console.log(result + "The delete was a succes");
});
