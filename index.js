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
    //Run your code here, after you have insured that the connection was made
    // Recipe.create({
    //   title: "Mangoo ala Mongoose",
    //   level: "Amateur Chef",
    //   ingredients: [
    //     "3 green plantain",
    //     "1 tablespoons salt",
    //     "Boiling water",
    //     "butter",
    //     "Cheese",
    //     "Salami or Bacon",
    //     "Eggs",
    //   ],
    //   cuisine: "Dominican",
    //   dishType: "main_course",
    //   image:
    //     "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    //   duration: 30,
    //   creator: "John Rosario",
    //   created: Date.now(),
    // });
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((data) => {
    console.log("data:", data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((findRecipe) => {
    console.log("updated recipe:", findRecipe);
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deleteRecipe) => {
    console.log("Success!", deleteRecipe);
    return mongoose.disconnect();
  })
  .then(() => {
    console.log("Disconected from the database, roger that");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
