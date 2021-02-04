const mongoose = require("mongoose");
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { insertMany } = require("./models/Recipe.model");
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
    const pr = Recipe.create({
      title: "Pasta carbonara",
      level: "Easy Peasy",
      ingredients: ["Pasta", "Egg", "Single Cream", "Water", "Salt"],
      cuisine: "Italian",
      dishType: "main_course",
      image:
        "https://www.pequerecetas.com/wp-content/uploads/2018/01/pasta-carbonara-receta.jpg",
      duration: 30,
      creator: "Unknown",
    });
    return pr;
  })
  .then((createdDoc) => {
    console.log(createdDoc.title);
  })
  .then(() => {
    const pr = Recipe.insertMany(data);
    return pr;
  })
  .then((data) => {
    data.forEach((receta) => {
      console.log(receta.title);
    });
  })
  .then(() => {
    const pr = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },
      { new: true }
    );
    return pr;
  })
  .then((updatedRecipe) => {
    console.log(updatedRecipe);
    console.log("Succesfuly updated");
  })
  .then(() => {
    console.log("Carrot Cake deleted");

    const pr = Recipe.deleteOne({ title: "Carrot Cake" });
    return pr;
  })
  .then(() => {
    mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
