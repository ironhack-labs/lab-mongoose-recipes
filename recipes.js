const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const Recipe = require("./recipe-model.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("💖 Connected to Mongo!");
  })
  .catch(err => {
    console.error("💖 Error connecting to mongo", err);
  });

Recipe.create({ cuisine: "Chocolate Chip Cookies" })
  .then(result => {
    console.log("💖 Create: Success", result);
  })
  .catch(err => {
    console.log("💖 Create: Failure", err);
  });

Recipe.insertMany(data)
  .then(result => {
    console.log("💖 Insert: Success", result);
  })
  .catch(err => {
    console.log("💖 Insert: Failure", err);
  });

Recipe.findByIdAndUpdate("5c544a17cbfe2830a19aeb7f", {
  $push: { duration: 10 }
})
  .then(result => {
    console.log("💖 Update: Success", result);
  })
  .catch(err => {
    console.log("💖 Update: Failure", err);
  });

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(result => {
    if (result) {
      console.log("💖 Delete: Success", result);
    } else {
      console.log("❤️ Nothing to delete");
    }
  })
  .catch(err => {
    console.log("💖 Remove: Failure", err);
  });
