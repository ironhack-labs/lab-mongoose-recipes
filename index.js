const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
// Connection to the database "recipeApp"

mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create({ title: "paella", cuisine: "spanish" })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.insertMany(data).then(data => {
  const banana = data.map(function(titles) {
    return titles.title;
  });
  console.log(banana);
});

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(
  value => {
    console.log(value);
    console.log("success");
  }
);

Recipe.deleteOne({ title: "Carrot Cake" }).then(value => {
  console.log("Sucess");
mongoose.connection.close().then(promise => {
  console.log("super close bro");
});
 });

