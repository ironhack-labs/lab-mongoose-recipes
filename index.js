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
    return Recipe.create({
      title: "Potatoes with salt",
      level: "Amateur Chef",
      ingredients: ["potatoes", "salt"],
      cuisine: "Japanese",
      dishType: "dessert",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 40,
      creator: "Chef Marcel",
    })
      .then((recipe) => {
        console.log("Added recipe", recipe.title);
      })
      .then(() => {
        return Recipe.insertMany(data);
        // })
        // .then((recipe) => {
        //   console.log("Added all recipes", recipe.title);
      })
      .then(() => {
        return Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        );
      })
      .then(() => {
        console.log("Recipe updated");
      })
      .then(() => {
        return Recipe.deleteOne({ title: "Carrot Cake" });
      })
      .then(() => {
        console.log("Carrot Cake has been deleted");
      })
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        console.log("Mongoose is now disconnected.");
      })
      .catch((error) => {
        console.error("Error connecting to the database", error);
      });
  });
