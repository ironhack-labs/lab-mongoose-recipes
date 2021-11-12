const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data.json");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return mongoose.connection.db.dropDatabase();
    //return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Mauldaschen",
      level: "UltraPro Chef",
      ingredients: ["Mauldaschen"],
      cuisine: "Schwaebsch",
      dishType: "main_course",
      image:
        "https://image.essen-und-trinken.de/11832162/t/jN/v9/w960/r1/-/maultaschen-klassisch-3e9b141c00bdf0763e7e647f43bc26fb-et2015010381-jpg--8677-.jpg",
      duration: 30,
      creator: "Manu",
    });
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((data) => {
    data.forEach((element) => {
      console.log(element.title);
    });
  })
  .then((data) => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((data) => {
    console.log(data);
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((data) => {
    console.log("Removed");
    return mongoose.connection.close();
  })
  .then((data) => {
    console.log("Connection was closed");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
