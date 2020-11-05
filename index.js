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
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

const scrambledEggs = {
  title: "Scrambled Eggs",
  level: "Easy Peasy",
  ingredients: ["Eggs", "Milk", "Salt", "Pepper", "Corriander"],
  cuisine: "English",
  dishType: "breakfast",
  duration: 15,
  creator: "Chef Roy-Arne Brussel",
};

Recipe.create(scrambledEggs)
  .then((recipe) =>
    console.log("The recipe has been saved and its value is: ", recipe)
  )
  .catch((error) =>
    console.log("An error happened while saving a new recipe: ", error)
  );

Recipe.insertMany(data)
  .then((recipe) =>
    console.log("The recipe has been saved and its value is: ", recipe)
  )
  .catch((error) =>
    console.log("An error happened while saving a new recipe: ", error)
  );

Recipe.updateOne(
  {
    title: "Rigatoni alla Genovese",
  },
  { duration: 100 }
)
  .then(() => console.log("The recipe has been updated accordingly"))
  .catch((error) =>
    console.log("An error happened while updating the recipe", error)
  );

Recipe.deleteOne({
  title: "Carrot Cake",
})
  .then(() => console.log("The recipe has been deleted accordingly"))
  .catch((error) =>
    console.log("An error happened while deleting the recipe", error)
  );

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Connection disconnected");
    process.exit(0);
  });
});
