//equivalente a app.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");
let index = require("./routes/index");
const Recipe = require("./models/Recipe");
let express = require("express");
let app = express();

mongoose
  .connect("mongodb://localhost:27017/recipeApp2", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
//the routes

//Recipe.insertMany(data);

/*
mongoose.connection.close(() => {
  console.log("done");
});
*/
app.use("/", index);

app.listen(3000, () => {
  console.log("im running baby");
});
