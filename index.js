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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data);
  })
  .then(() => {
    const updatePromise = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
    const deletePromise = Recipe.deleteOne({ title: "Carrot Cake" });

    return Promise.all([updatePromise, deletePromise]);
  })
  .then((document) => {
    console.log("Duration updated and Carrot cake deleted");
    console.log(document);
    mongoose.connection.close();
  })
  .catch((err) => console.log("Error", err));
