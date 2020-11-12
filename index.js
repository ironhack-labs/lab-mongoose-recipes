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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries

    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    /*    const recipe1 = {
      title: data[0].title,
      level: data[0].level,
      ingredients: data[0].ingredients,
      cuisine: data[0].cuisine,
      dishType: data[0].dishType,
      image: data[0].image,
      duration: data[0].duration,
      creator: data[0].creator,
    };
    const pr = Recipe.create(recipe1);
    return pr; */
  })
  .then(() => {
    const pr = Recipe.insertMany(data);
    data.forEach((recipe) => {
      console.log(recipe.title);
    });
    return pr;
  })
  .then(() => {
    const pr = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );

    return pr;
  })
  .then(() => {
    console.log("successful update");
  })
  .then(() => {
    const pr = Recipe.deleteOne({ title: "Carrot Cake" });

    return pr;
  })
  .then(() => {
    console.log("deleted carrot cake");

    mongoose.connection.close(() => {
      console.log("connection disconnected due to app termination");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
