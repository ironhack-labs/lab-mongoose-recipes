const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

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
  })
  .then(() => {
    return Recipe.create({
      title: "Rice",
      level: "Easy Peasy",
      ingredients: ["Rice"],
      cuisine: "Exotic",
      dishType: "other",
    });
  })
  .then((recipe) => {
    console.log("created tasty dish: " + recipe.title);
  })
  .then(() => {
    return Recipe.create([...data]);
  })
  .then((d) => {
    d.forEach((rec) => console.log(rec.title));
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((rec) => {
    console.log("updated rec: " + rec);
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((one) => {
    console.log("deleted " + one);
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    console.log("good night");
    mongoose.disconnect();
  });
