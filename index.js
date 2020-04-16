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

// for demo reasons
// let rice = Recipe.create({
//   title: "Rice",
//   level: "Easy Peasy",
//   ingredients: ["Rice"],
//   cuisine: "Exotic",
//   dishType: "other",
// });

let rice = {
  title: "Rice",
  level: "Easy Peasy",
  ingredients: ["Rice"],
  cuisine: "Exotic",
  dishType: "other",
};
data.push(rice);

let allThoseThangs = Recipe.insertMany(data);

let upda = Recipe.findOneAndUpdate(
  { name: "Rigatoni alla Genovese" },
  { duration: 100 }
)
  .then((i) => {
    console.log("updated");
  })
  .catch((e) => {
    console.log(e);
  });

let rem = Recipe.deleteOne({ name: "Carrot Cake" })
  .then((i) => {
    console.log("deleted");
  })
  .catch((e) => {
    console.log(e);
  });

Promise.all([allThoseThangs, upda, rem])
  .then((re) => {
    console.log("Done writing");
    re.forEach((i) => {
      i.forEach((j) => console.log(j.title));
    });
    mongoose.connection.close(() => {
      console.log("Mongoose default connection closed");
    });
  })
  .catch((err) => {
    "error in finishing " + err;
  });
