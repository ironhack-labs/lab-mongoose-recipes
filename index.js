const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Recipe.create({
    //   title: "PF",
    //   level: "Easy Peasy",
    //   ingredients: ["arroz", "feijão", "carne", "batata"],
    //   couisine: "Brasileira",
    //   dishtype: "main_course",
    //   duration: 3,
    //   creator: "Junior",
    //   });
    // console.log("title");

    // Recipe.insertMany(data);

    // Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},
    //   { $set: { duration: 100 } },
    //   { new: true },
    //   (err, doc) => {
    //     if (err) {
    //       console.log("Something wrong when updating data!");
    //     }

    //     console.log("Updated!");
    //   }
    // );

    Recipe.deleteOne({ title: "Carrot Cake" });

    mongoose.connection.close();
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
