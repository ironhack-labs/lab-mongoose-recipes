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
  .then(() => Recipe.syncIndexes())
  .then(() => Recipe.create(paella))
  .then((recipe) => console.log("La receta es ", recipe))
  .then(() => Recipe.create(data))
  .then((data) => data.forEach((recipe) => console.log(recipe.title)))
  .then(() =>
    Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(() => console.log("Elemento cambiado"))
  )
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }).then(() => console.log("Elemento eliminado")))
  .then(() => mongoose.connection.close())
  .then(() => console.log("Closed"))

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

const paella = {
  title: "Paella",
  level: "UltraPro Chef",
  ingredients: ["Arroz", "Judias", "Colorante"],
  cuisine: "Mediterranean",
  dishType: "main_course",
  image: "",
  duration: 20,
  creator: "Marcos",
  created: "",
};
