const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { db } = require("./models/Recipe.model");

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
  .then((response) => {
    const newRecipe = {
      title: "Crêpe avec du fromage",
      level: "Professional Chef",
      ingredients: ["Crêpe", "Fromage"],
      cuisine: "Français",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 20,
      creator: "Monsieur Crêpe",
    };
    const pr = Recipe.create(newRecipe);
    return pr;
  })
  //.then((response) => {
  //console.log(response);
  //})
  .then((response) => {
    const pr = Recipe.insertMany(data);
    return pr;
  })
  .then((response) => {
    const pr = Recipe.find({}, { title: 1, _id: 0 });
    return pr;
  })
  .then((response) => {
    console.log(response);
  })
  .then((response) => {
    const pr = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
    console.log("Bon appetit!");
    return pr;
  })
  .then((response) => {
    const pr = Recipe.deleteOne({ title: "Carrot Cake" });
    return pr;
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

process.on("SIGINT", () => {
  mongoose.connection
    .close()
    .then((data) => console.log("Connection closed"))
    .catch((err) => console.log(err));
});
