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
    Recipe.create({
      title: "Tortilla",
      level: "UltraPro Chef",
      ingredients: ["Potatoes", "Eggs", "Salt"],
      cuisine: "Mariana",
      dishType: "other",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 60,
      creator: "Mariana",
    });
  })

  .then(() => {
    Recipe.insertMany(data);
  })

  Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 },
  { new: true }
).then((recipe) => console.log("Upload successfully",recipe))

Recipe.deleteOne({title: "Carrot Cake"})
.then((recipe) => console.log("Receta eliminada",recipe))

.catch((error) => {
  console.error("Error connecting to the database", error);
});