const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
const recipeOne = {
  title: "Boiled Eggs",
  level: "Easy Peasy",
  ingredients: ["Eggs", "Water"],
  cuisine: "Random",
  dishType: "main_course",
  image:
    "https://www.jessicagavin.com/wp-content/uploads/2018/03/how-to-hard-boil-eggs-8-1200_v2.jpg",
  duration: 10,
  creator: "Vic",
};

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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async () => {
    await Recipe.create(recipeOne);
    console.log(recipeOne.title);
  })
  .then(async () => {
    await Recipe.insertMany(data);
    data.forEach((x) => console.log(x.title));
  })
  .then(async () => {
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    console.log("Success");
  })
  .then(async () => {
    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Deleted");
  })
  .then(async () => {
    await mongoose.disconnect(MONGODB_URI);
    console.log("Database closed");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
