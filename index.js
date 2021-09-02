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
    return Recipe.create({
      title: "Beef Noodle Soup",
      level: "Medium",
      ingredients: ["Beef", "Noodle", "Soup"],
      cuisine: "Mix it all together",
      dishType: "Main meal",
      image: "None",
      duration: 30,
      creator: "Someone",
      created: new Date(),
    });
    // Run your code here, after you have insured that the connection was made
  })
  .then((createdRecepie) => {
    console.log(createdRecepie.title);

    return Recipe.insertMany(data);
  })
  .then((insertRecepies) => {
    console.log(insertRecepies.title);

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    console.log("Success!!");

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((removedRecipe) => {
    console.log("Success!");
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  })

  .finally(() => {
    return mongoose.disconnect();
  });
