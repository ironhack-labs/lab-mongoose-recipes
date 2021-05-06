const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Quiche",
      level: "Easy Peasy",
      ingredients: ["foo", "bar", "baz"],
      cuisine: "french",
      dish: "main_course",
      duration: 30,
      creator: "Stephane",
    })
    .then(() => {
      // implementing
      Recipe.insertMany(data)
      .then(() => {
        // implementing
        // Recipe.findOneAndUpdate( This was not working
        Recipe.updateOne(
          // This wac not woking too HELP!
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        )
          .then(() => {
            // implementing
            Recipe.deleteOne({ title: "Carrot Cake" })
            .then(() => {
              mongoose.connection.close(() => console.log("i'm closed"))
              // process.exit()
            })
          })
      })
    })
    console.log("Quiche was added succesfully");
  })






  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// Model.insertMany
