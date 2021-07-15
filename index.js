const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/myrecipes";

const ramenRecipe = {
  title: "Chicken Ramen",
  level: "Amateur Chef",
  cuisine: "Asian",
  dishType: "soup",
  duration: "60",
  creator: "Chef Ichiraku",
  created: Date.today,
};

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
    Recipe.create(ramenRecipe).then((res) => console.log(res));
    Recipe.insertMany(data).then(res => console.log(res))
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
