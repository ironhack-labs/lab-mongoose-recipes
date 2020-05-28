const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");

// Import of the data from './data.json'
const Data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // .then((self) => {
  //   console.log(`Connected to the database: "${self.connection.name}"`);
  //   // Before adding any documents to the database, let's delete all previous entries
  //   return self.connection.dropDatabase();
  // })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Chocolate mousse",
      level: "Easy Peasy",
      ingredients: ["chocolate", "egg"],
      cuisine: "French",
      duration: 20,
      creator: "Justine",
    });
    console.log(Recipe.title);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

Recipe.insertMany(Data).then((res) => {
  console.log("Data added", res);
});

Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(() => {
    console.log("successfully updated");
    Recipe.deleteOne({ title: "Carrot Cake alla Genovese" })
      .then(() => {
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  })
  .catch((error) => {
    console.error("Error", error);
  });
